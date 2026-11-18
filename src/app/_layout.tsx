import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { DATABASE_NAME, migrateDatabase } from '../data/database';

export default function RootLayout() {
  const [databaseFailed, setDatabaseFailed] = useState(false);

  if (databaseFailed) {
    return <EmptyState message="Nie udało się otworzyć bazy danych. Zamknij aplikację i uruchom ją ponownie." />;
  }

  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      onInit={migrateDatabase}
      onError={(error) => {
        console.error('Błąd inicjalizacji bazy danych', error);
        setDatabaseFailed(true);
      }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
