export const ACTIVITY_KINDS = ['feeding', 'walk', 'vet_visit', 'medication', 'grooming', 'other'] as const;

export type ActivityKind = (typeof ACTIVITY_KINDS)[number];

export const ACTIVITY_KIND_LABELS: Record<ActivityKind, string> = {
  feeding: 'Karmienie',
  walk: 'Spacer',
  vet_visit: 'Wizyta u weterynarza',
  medication: 'Leki',
  grooming: 'Pielęgnacja',
  other: 'Inne',
};

export function isActivityKind(value: string): value is ActivityKind {
  return (ACTIVITY_KINDS as readonly string[]).includes(value);
}

export type Pet = {
  id: string;
  name: string;
  species: string;
};

export type CareActivity = {
  id: string;
  petId: string;
  kind: ActivityKind;
  date: string;
  description: string;
};

export type CareActivityWithPet = CareActivity & {
  petName: string;
};

export type PetInput = {
  name: string;
  species: string;
};

export type ActivityInput = {
  petId: string;
  kind: ActivityKind | null;
  date: Date | null;
  description: string;
};
