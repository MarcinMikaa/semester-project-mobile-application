import type { ValidationErrors } from '../domain/validation';

export type ServiceResult<T, Field extends string> =
  | { ok: true; value: T }
  | { ok: false; errors: ValidationErrors<Field | 'form'> };

export const SAVE_FAILED_MESSAGE = 'Nie udało się zapisać. Spróbuj ponownie.';
