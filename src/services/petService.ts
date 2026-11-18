import { randomUUID } from 'expo-crypto';
import type { PetRepository } from '../data/petRepository';
import type { Pet, PetInput } from '../domain/types';
import { hasErrors, validatePet } from '../domain/validation';
import { SAVE_FAILED_MESSAGE, type ServiceResult } from './result';

export type PetService = {
  getAll(): Promise<Pet[]>;
  getById(id: string): Promise<Pet | null>;
  create(input: PetInput): Promise<ServiceResult<Pet, keyof PetInput>>;
  update(id: string, input: PetInput): Promise<ServiceResult<Pet, keyof PetInput>>;
};

export function createPetService(repository: PetRepository, generateId: () => string = randomUUID): PetService {
  return {
    getAll: () => repository.getAll(),

    getById: (id) => repository.getById(id),

    async create(input) {
      const errors = validatePet(input);
      if (hasErrors(errors)) return { ok: false, errors };

      const pet: Pet = {
        id: generateId(),
        name: input.name.trim(),
        species: input.species.trim(),
      };

      try {
        await repository.insert(pet);
        return { ok: true, value: pet };
      } catch (error) {
        console.error('Nie udało się zapisać zwierzęcia', error);
        return { ok: false, errors: { form: SAVE_FAILED_MESSAGE } };
      }
    },

    async update(id, input) {
      const errors = validatePet(input);
      if (hasErrors(errors)) return { ok: false, errors };

      try {
        const existing = await repository.getById(id);
        if (!existing) {
          return { ok: false, errors: { form: 'Nie znaleziono zwierzęcia.' } };
        }

        const pet: Pet = { id, name: input.name.trim(), species: input.species.trim() };
        await repository.update(pet);
        return { ok: true, value: pet };
      } catch (error) {
        console.error('Nie udało się zaktualizować zwierzęcia', error);
        return { ok: false, errors: { form: SAVE_FAILED_MESSAGE } };
      }
    },
  };
}
