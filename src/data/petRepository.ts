import type { SQLiteDatabase } from 'expo-sqlite';
import type { Pet } from '../domain/types';

type PetRow = {
  id: string;
  name: string;
  species: string;
};

function toPet(row: PetRow): Pet {
  return { id: row.id, name: row.name, species: row.species };
}

export type PetRepository = {
  getAll(): Promise<Pet[]>;
  getById(id: string): Promise<Pet | null>;
  insert(pet: Pet): Promise<void>;
  update(pet: Pet): Promise<void>;
};

export function createPetRepository(db: SQLiteDatabase): PetRepository {
  return {
    async getAll() {
      const rows = await db.getAllAsync<PetRow>('SELECT id, name, species FROM pets ORDER BY name COLLATE NOCASE ASC');
      return rows.map(toPet);
    },

    async getById(id) {
      const row = await db.getFirstAsync<PetRow>('SELECT id, name, species FROM pets WHERE id = ?', id);
      return row ? toPet(row) : null;
    },

    async insert(pet) {
      await db.runAsync('INSERT INTO pets (id, name, species) VALUES (?, ?, ?)', pet.id, pet.name, pet.species);
    },

    async update(pet) {
      await db.runAsync('UPDATE pets SET name = ?, species = ? WHERE id = ?', pet.name, pet.species, pet.id);
    },
  };
}
