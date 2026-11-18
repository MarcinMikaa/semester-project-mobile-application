import { router } from 'expo-router';
import { EmptyState } from '../../components/EmptyState';

export default function ActivitiesScreen() {
  return (
    <EmptyState
      message="Nie masz jeszcze żadnych czynności."
      actionLabel="Dodaj czynność"
      onAction={() => router.push('/activity/form')}
    />
  );
}
