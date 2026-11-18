import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { createActivityRepository } from '../data/activityRepository';
import { createPetRepository } from '../data/petRepository';
import { createActivityService } from '../services/activityService';
import { createPetService } from '../services/petService';

export function useServices() {
  const db = useSQLiteContext();

  return useMemo(() => {
    const petRepository = createPetRepository(db);
    const activityRepository = createActivityRepository(db);

    return {
      pets: createPetService(petRepository),
      activities: createActivityService(activityRepository, petRepository),
    };
  }, [db]);
}
