import { router } from 'expo-router';
import { EmptyState } from '../../components/EmptyState';

export default function PetsScreen() {
  return (
    <EmptyState
      message="Nie masz jeszcze żadnych zwierząt."
      actionLabel="Dodaj zwierzę"
      onAction={() => router.push('/pet/form')}
    />
  );
}
