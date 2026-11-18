import { randomUUID } from 'expo-crypto';
import type { ActivityRepository } from '../data/activityRepository';
import type { PetRepository } from '../data/petRepository';
import type { ActivityInput, CareActivity, CareActivityWithPet } from '../domain/types';
import { hasErrors, validateActivity } from '../domain/validation';
import { SAVE_FAILED_MESSAGE, type ServiceResult } from './result';

export type ActivityService = {
  getAll(): Promise<CareActivityWithPet[]>;
  getById(id: string): Promise<CareActivityWithPet | null>;
  create(input: ActivityInput): Promise<ServiceResult<CareActivity, keyof ActivityInput>>;
};

export function createActivityService(
  activities: ActivityRepository,
  pets: PetRepository,
  generateId: () => string = randomUUID,
  now: () => Date = () => new Date(),
): ActivityService {
  return {
    getAll: () => activities.getAll(),

    getById: (id) => activities.getById(id),

    async create(input) {
      const errors = validateActivity(input, now());
      if (hasErrors(errors) || input.kind === null || input.date === null) {
        return { ok: false, errors };
      }

      try {
        const pet = await pets.getById(input.petId);
        if (!pet) {
          return { ok: false, errors: { petId: 'Wybrane zwierzę nie istnieje.' } };
        }

        const activity: CareActivity = {
          id: generateId(),
          petId: pet.id,
          kind: input.kind,
          date: input.date.toISOString(),
          description: input.description.trim(),
        };

        await activities.insert(activity);
        return { ok: true, value: activity };
      } catch (error) {
        console.error('Nie udało się zapisać czynności', error);
        return { ok: false, errors: { form: SAVE_FAILED_MESSAGE } };
      }
    },
  };
}
