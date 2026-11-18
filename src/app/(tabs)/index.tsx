import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { LoadingState } from '../../components/LoadingState';
import { colors, fontSize, radius, spacing } from '../../constants/theme';
import { formatDateTime } from '../../domain/dates';
import { ACTIVITY_KIND_LABELS, type CareActivityWithPet } from '../../domain/types';
import { useActivities } from '../../hooks/useActivities';

export default function ActivitiesScreen() {
  const { data, loading, error, reload } = useActivities();

  if (data === undefined) {
    if (error) {
      return <EmptyState message="Nie udało się wczytać czynności." actionLabel="Spróbuj ponownie" onAction={reload} />;
    }
    if (loading) return <LoadingState />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        message="Nie masz jeszcze żadnych czynności."
        actionLabel="Dodaj czynność"
        onAction={() => router.push('/activity/form')}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      style={styles.background}
      renderItem={({ item }) => <ActivityListItem activity={item} />}
    />
  );
}

function ActivityListItem({ activity }: { activity: CareActivityWithPet }) {
  const kindLabel = ACTIVITY_KIND_LABELS[activity.kind];
  const dateText = formatDateTime(activity.date);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${kindLabel}, ${activity.petName}, ${dateText}`}
      onPress={() => router.push({ pathname: '/activity/[id]', params: { id: activity.id } })}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{kindLabel}</Text>
        <Text style={styles.itemDate}>{dateText}</Text>
      </View>
      <Text style={styles.itemPet}>{activity.petName}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {activity.description}
      </Text>
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
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  itemTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text, flexShrink: 1 },
  itemDate: { fontSize: fontSize.sm, color: colors.textMuted },
  itemPet: { marginTop: spacing.xs, fontSize: fontSize.sm, color: colors.primary },
  itemDescription: { marginTop: spacing.xs, fontSize: fontSize.sm, color: colors.textMuted },
});
