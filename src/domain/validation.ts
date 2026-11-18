import { isActivityKind, type ActivityInput, type PetInput } from './types';

export type ValidationErrors<Field extends string> = Partial<Record<Field, string>>;

export const PET_NAME_MAX_LENGTH = 50;
export const PET_SPECIES_MAX_LENGTH = 50;
export const ACTIVITY_DESCRIPTION_MAX_LENGTH = 500;
export const MIN_ACTIVITY_DATE = new Date(2000, 0, 1);

export function hasErrors(errors: ValidationErrors<string>): boolean {
  return Object.values(errors).some((message) => message !== undefined);
}

function validateRequiredText(
  value: string,
  maxLength: number,
  emptyMessage: string,
  tooLongMessage: string,
): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0) return emptyMessage;
  if (trimmed.length > maxLength) return tooLongMessage;
  return undefined;
}

export function validatePet(input: PetInput): ValidationErrors<keyof PetInput> {
  const errors: ValidationErrors<keyof PetInput> = {};

  const nameError = validateRequiredText(
    input.name,
    PET_NAME_MAX_LENGTH,
    'Podaj imię zwierzęcia.',
    `Imię może mieć najwyżej ${PET_NAME_MAX_LENGTH} znaków.`,
  );
  if (nameError) errors.name = nameError;

  const speciesError = validateRequiredText(
    input.species,
    PET_SPECIES_MAX_LENGTH,
    'Podaj gatunek zwierzęcia.',
    `Gatunek może mieć najwyżej ${PET_SPECIES_MAX_LENGTH} znaków.`,
  );
  if (speciesError) errors.species = speciesError;

  return errors;
}

export function validateActivity(input: ActivityInput, now: Date = new Date()): ValidationErrors<keyof ActivityInput> {
  const errors: ValidationErrors<keyof ActivityInput> = {};

  if (input.petId.trim().length === 0) {
    errors.petId = 'Wybierz zwierzę.';
  }

  if (input.kind === null || !isActivityKind(input.kind)) {
    errors.kind = 'Wybierz rodzaj czynności.';
  }

  if (input.date === null) {
    errors.date = 'Podaj datę czynności.';
  } else if (Number.isNaN(input.date.getTime())) {
    errors.date = 'Podaj poprawną datę.';
  } else if (input.date.getTime() > now.getTime()) {
    errors.date = 'Data nie może być z przyszłości.';
  } else if (input.date.getTime() < MIN_ACTIVITY_DATE.getTime()) {
    errors.date = 'Data nie może być wcześniejsza niż 01.01.2000.';
  }

  const descriptionError = validateRequiredText(
    input.description,
    ACTIVITY_DESCRIPTION_MAX_LENGTH,
    'Podaj opis czynności.',
    `Opis może mieć najwyżej ${ACTIVITY_DESCRIPTION_MAX_LENGTH} znaków.`,
  );
  if (descriptionError) errors.description = descriptionError;

  return errors;
}
