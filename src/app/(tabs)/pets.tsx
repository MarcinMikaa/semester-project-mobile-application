import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { LoadingState } from '../../components/LoadingState';
import { colors, fontSize, radius, spacing } from '../../constants/theme';
import type { Pet } from '../../domain/types';
import { usePets } from '../../hooks/usePets';

export default function PetsScreen() {
  const { data, loading, error, reload } = usePets();

  if (data === undefined) {
    if (error) {
      return <EmptyState message="Nie udało się wczytać zwierząt." actionLabel="Spróbuj ponownie" onAction={reload} />;
    }
    if (loading) return <LoadingState />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        message="Nie masz jeszcze żadnych zwierząt."
        actionLabel="Dodaj zwierzę"
        onAction={() => router.push('/pet/form')}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      style={styles.background}
      renderItem={({ item }) => <PetListItem pet={item} />}
    />
  );
}

function PetListItem({ pet }: { pet: Pet }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${pet.name}, ${pet.species}. Edytuj`}
      onPress={() => router.push({ pathname: '/pet/form', params: { id: pet.id } })}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
      <Text style={styles.itemTitle}>{pet.name}</Text>
      <Text style={styles.itemSubtitle}>{pet.species}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: { backgroundColor: colors.background },
  list: { padding: spacing.lg, gap: spacing.md },
  item: {
    padding: spacing.lg,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  itemPressed: { opacity: 0.85 },
  itemTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  itemSubtitle: { marginTop: spacing.xs, fontSize: fontSize.sm, color: colors.textMuted },
});
