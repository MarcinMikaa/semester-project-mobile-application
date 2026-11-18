import { useCallback } from 'react';
import { useFocusQuery } from './useFocusQuery';
import { useServices } from './useServices';

export function useActivities() {
  const { activities } = useServices();
  const query = useCallback(() => activities.getAll(), [activities]);
  return useFocusQuery(query);
}

export function useActivity(id: string) {
  const { activities } = useServices();
  const query = useCallback(() => activities.getById(id), [activities, id]);
  return useFocusQuery(query);
}
