import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export type QueryState<T> = {
  data: T | undefined;
  loading: boolean;
  error: boolean;
  reload: () => void;
};

export function useFocusQuery<T>(query: () => Promise<T>): QueryState<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);

      query()
        .then((result) => {
          if (!active) return;
          setData(result);
          setError(false);
        })
        .catch((reason: unknown) => {
          console.error('Nie udało się wczytać danych', reason);
          if (active) setError(true);
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    }, [query, attempt]),
  );

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  return { data, loading, error, reload };
}
