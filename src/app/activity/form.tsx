import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { ChoiceChips } from '../../components/ChoiceChips';
import { DateTimeField } from '../../components/DateTimeField';
import { EmptyState } from '../../components/EmptyState';
import { ErrorBanner } from '../../components/ErrorBanner';
import { FormField } from '../../components/FormField';
import { LoadingState } from '../../components/LoadingState';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors, spacing } from '../../constants/theme';
import { ACTIVITY_KINDS, ACTIVITY_KIND_LABELS, type ActivityInput } from '../../domain/types';
import { ACTIVITY_DESCRIPTION_MAX_LENGTH, MIN_ACTIVITY_DATE, type ValidationErrors } from '../../domain/validation';
import { usePets } from '../../hooks/usePets';
import { useServices } from '../../hooks/useServices';

type ActivityFormErrors = ValidationErrors<keyof ActivityInput | 'form'>;

const KIND_OPTIONS = ACTIVITY_KINDS.map((kind) => ({
  value: kind,
  label: ACTIVITY_KIND_LABELS[kind],
}));

const TITLE = 'Nowa czynność';

export default function ActivityFormScreen() {
  const { activities } = useServices();
  const petsQuery = usePets();
  const [values, setValues] = useState<ActivityInput>(() => ({
    petId: '',
    kind: null,
    date: new Date(),
    description: '',
  }));
  const [errors, setErrors] = useState<ActivityFormErrors>({});
  const [saving, setSaving] = useState(false);

  function setField<K extends keyof ActivityInput>(field: K, value: ActivityInput[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  }

  async function handleSave() {
    setSaving(true);
    const result = await activities.create(values);
    setSaving(false);

    if (result.ok) {
      router.back();
    } else {
      setErrors(result.errors);
    }
  }

  if (petsQuery.data === undefined) {
    return (
      <>
        <Stack.Screen options={{ title: TITLE }} />
        {petsQuery.error ? (
          <EmptyState
            message="Nie udało się wczytać listy zwierząt."
            actionLabel="Spróbuj ponownie"
            onAction={petsQuery.reload}
          />
        ) : (
          <LoadingState />
        )}
      </>
    );
  }

  if (petsQuery.data.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: TITLE }} />
        <EmptyState
          message="Najpierw dodaj zwierzę. Każda czynność musi być przypisana do zwierzęcia."
          actionLabel="Dodaj zwierzę"
          onAction={() => router.push('/pet/form')}
        />
      </>
    );
  }

  const petOptions = petsQuery.data.map((pet) => ({ value: pet.id, label: pet.name }));

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title: TITLE }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ErrorBanner message={errors.form} />
        <ChoiceChips
          label="Zwierzę"
          options={petOptions}
          selected={values.petId === '' ? null : values.petId}
          onSelect={(petId) => setField('petId', petId)}
          error={errors.petId}
        />
        <ChoiceChips
          label="Rodzaj czynności"
          options={KIND_OPTIONS}
          selected={values.kind}
          onSelect={(kind) => setField('kind', kind)}
          error={errors.kind}
        />
        <DateTimeField
          label="Data i godzina"
          value={values.date ?? new Date()}
          onChange={(date) => setField('date', date)}
          minimumDate={MIN_ACTIVITY_DATE}
          maximumDate={new Date()}
          error={errors.date}
        />
        <FormField
          label="Opis"
          value={values.description}
          onChangeText={(description) => setField('description', description)}
          error={errors.description}
          maxLength={ACTIVITY_DESCRIPTION_MAX_LENGTH}
          multiline
          placeholder="np. spacer po parku, 30 minut"
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
