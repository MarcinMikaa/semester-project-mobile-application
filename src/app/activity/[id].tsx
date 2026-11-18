import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { LoadingState } from '../../components/LoadingState';
import { colors, fontSize, radius, spacing } from '../../constants/theme';
import { formatDateTime } from '../../domain/dates';
import { ACTIVITY_KIND_LABELS } from '../../domain/types';
import { useActivity } from '../../hooks/useActivities';

const TITLE = 'Szczegóły czynności';

export default function ActivityDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = typeof params.id === 'string' ? params.id : '';
  const { data, loading, error, reload } = useActivity(id);

  let content: React.ReactNode;
  if (data === undefined) {
    content = error ? (
      <EmptyState message="Nie udało się wczytać czynności." actionLabel="Spróbuj ponownie" onAction={reload} />
    ) : loading ? (
      <LoadingState />
    ) : null;
  } else if (data === null) {
    content = <EmptyState message="Nie znaleziono czynności. Mogła zostać usunięta." />;
  } else {
    content = (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <DetailRow label="Rodzaj" value={ACTIVITY_KIND_LABELS[data.kind]} />
          <DetailRow label="Zwierzę" value={data.petName} />
          <DetailRow label="Data i godzina" value={formatDateTime(data.date)} />
          <DetailRow label="Opis" value={data.description} />
        </View>
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: TITLE }} />
      {content}
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  card: {
    padding: spacing.lg,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.lg,
  },
  row: { gap: spacing.xs },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textMuted },
  value: { fontSize: fontSize.md, color: colors.text },
});
