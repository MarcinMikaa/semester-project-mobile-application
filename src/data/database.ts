import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'petcare.db';

const LATEST_SCHEMA_VERSION = 1;

export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion >= LATEST_SCHEMA_VERSION) {
    return;
  }

  if (currentVersion < 1) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS pets (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          species TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS care_activities (
          id TEXT PRIMARY KEY NOT NULL,
          pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE RESTRICT,
          kind TEXT NOT NULL CHECK (
            kind IN ('feeding', 'walk', 'vet_visit', 'medication', 'grooming', 'other')
          ),
          date TEXT NOT NULL,
          description TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_care_activities_pet_id ON care_activities (pet_id);
        CREATE INDEX IF NOT EXISTS idx_care_activities_date ON care_activities (date);
      `);
    });
  }

  await db.execAsync(`PRAGMA user_version = ${LATEST_SCHEMA_VERSION};`);
}
