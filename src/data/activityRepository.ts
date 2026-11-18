import type { SQLiteDatabase } from 'expo-sqlite';
import type { ActivityKind, CareActivity, CareActivityWithPet } from '../domain/types';

type ActivityRow = {
  id: string;
  pet_id: string;
  kind: string;
  date: string;
  description: string;
  pet_name: string;
};

function toActivity(row: ActivityRow): CareActivityWithPet {
  return {
    id: row.id,
    petId: row.pet_id,
    kind: row.kind as ActivityKind,
    date: row.date,
    description: row.description,
    petName: row.pet_name,
  };
}

const SELECT_WITH_PET = `
  SELECT a.id, a.pet_id, a.kind, a.date, a.description, p.name AS pet_name
  FROM care_activities a
  JOIN pets p ON p.id = a.pet_id
`;

export type ActivityRepository = {
  getAll(): Promise<CareActivityWithPet[]>;
  getById(id: string): Promise<CareActivityWithPet | null>;
  insert(activity: CareActivity): Promise<void>;
};

export function createActivityRepository(db: SQLiteDatabase): ActivityRepository {
  return {
    async getAll() {
      const rows = await db.getAllAsync<ActivityRow>(`${SELECT_WITH_PET} ORDER BY a.date DESC`);
      return rows.map(toActivity);
    },

    async getById(id) {
      const row = await db.getFirstAsync<ActivityRow>(`${SELECT_WITH_PET} WHERE a.id = ?`, id);
      return row ? toActivity(row) : null;
    },

    async insert(activity) {
      await db.runAsync(
        'INSERT INTO care_activities (id, pet_id, kind, date, description) VALUES (?, ?, ?, ?, ?)',
        activity.id,
        activity.petId,
        activity.kind,
        activity.date,
        activity.description,
      );
    },
  };
}
