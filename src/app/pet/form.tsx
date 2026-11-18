import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { ErrorBanner } from '../../components/ErrorBanner';
import { FormField } from '../../components/FormField';
import { LoadingState } from '../../components/LoadingState';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors, spacing } from '../../constants/theme';
import type { PetInput } from '../../domain/types';
import { PET_NAME_MAX_LENGTH, PET_SPECIES_MAX_LENGTH, type ValidationErrors } from '../../domain/validation';
import { useServices } from '../../hooks/useServices';

type PetFormErrors = ValidationErrors<keyof PetInput | 'form'>;

export default function PetFormScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const petId = typeof params.id === 'string' && params.id.length > 0 ? params.id : null;

  const { pets } = useServices();
  const [values, setValues] = useState<PetInput>({ name: '', species: '' });
  const [errors, setErrors] = useState<PetFormErrors>({});
  const [loading, setLoading] = useState(petId !== null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (petId === null) return;
    let active = true;

    pets
      .getById(petId)
      .then((pet) => {
        if (!active) return;
        if (pet) {
          setValues({ name: pet.name, species: pet.species });
        } else {
          setErrors({ form: 'Nie znaleziono zwierzęcia.' });
        }
      })
      .catch((error: unknown) => {
        console.error('Nie udało się wczytać zwierzęcia', error);
        if (active) setErrors({ form: 'Nie udało się wczytać danych zwierzęcia.' });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [petId, pets]);

  function setField<K extends keyof PetInput>(field: K, value: PetInput[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  }

  async function handleSave() {
    setSaving(true);
    const result = petId === null ? await pets.create(values) : await pets.update(petId, values);
    setSaving(false);

    if (result.ok) {
      router.back();
    } else {
      setErrors(result.errors);
    }
  }

  const title = petId === null ? 'Nowe zwierzę' : 'Edycja zwierzęcia';

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title }} />
        <LoadingState />
      </>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ErrorBanner message={errors.form} />
        <FormField
          label="Imię"
          value={values.name}
          onChangeText={(name) => setField('name', name)}
          error={errors.name}
          maxLength={PET_NAME_MAX_LENGTH}
          autoCapitalize="words"
          placeholder="np. Burek"
        />
        <FormField
          label="Gatunek"
          value={values.species}
          onChangeText={(species) => setField('species', species)}
          error={errors.species}
          maxLength={PET_SPECIES_MAX_LENGTH}
          placeholder="np. pies"
        />
        <PrimaryButton label={saving ? 'Zapisywanie…' : 'Zapisz'} onPress={handleSave} disabled={saving} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
});
