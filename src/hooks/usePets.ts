import { useCallback } from 'react';
import { useFocusQuery } from './useFocusQuery';
import { useServices } from './useServices';

export function usePets() {
  const { pets } = useServices();
  const query = useCallback(() => pets.getAll(), [pets]);
  return useFocusQuery(query);
}
