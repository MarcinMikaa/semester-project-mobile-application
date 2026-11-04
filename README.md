# PetCare - MOB-029

Mobilna aplikacja do prowadzenia dziennika opieki nad zwierzętami. Opiekun zapisuje zwierzęta i czynności opiekuńcze (karmienie, spacer, terning, czy wizyta u weterynarza), przegląda je, wyszukuje i filtruje oraz widzi, ile czynności wykonano dla zwierzęcia w danym tygodniu.

- Karta biznesowa: [`business-requirements_29.md`](business-requirements_29.md)
- Wymagania wspólne: [`requirements.md`](requirements.md)
- Zasady pracy: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Technologia i wersje

Uzasadnienie wyboru: [`docs/technology-decision.md`](docs/technology-decision.md).

|       Element       |                          Wersja                          |
|---------------------|----------------------------------------------------------|
| React Native        | 0.88.1                                                   |
| Expo SDK            | 58                                                       |
| React               | 19.3.0                                                   |
| TypeScript          | ~6.0.3                                                   |
| Nawigacja           | expo-router ~58.0.30                                     |
| Node.js             | 22.22.2                                                  |
| npm                 | 10.9.7                                                   |
| Android Studio      | 2026.2.2                                                 |
| Urządzenie testowe  | emulator Pixel 10 Pro, Android 16 (API 36), Expo Go      |
| System deweloperski | Windows 11                                               |


## Wymagania środowiskowe

- Git
- Node.js w wersji z tabeli
- Android Studio z zainstalowanymi:
  - Android SDK Platform 36
  - Android SDK Build-Tools
  - Android Emulator
  - Android SDK Platform-Tools
  - utworzonym urządzeniem wirtualnym (AVD)


## Instalacja

git clone https://github.com/MarcinMikaa/semester-project-mobile-application.git
cd semester-project-mobile-application
npm ci


## Uruchomienie

1. Uruchom emulator Android Studio
2. W katalogu projektu wpisz:
   npx expo start
   
3. Naciśnij `a`. Expo CLI zainstaluje na emulatorze Expo Go zgodne z SDK 58 i otworzy aplikację.


## Testy

Testy automatyczne nie zostały jeszcze dodane

npx tsc --noEmit


## Zakres funkcji

Zrealizowane:
- [x] Szkielet aplikacji z ekranem startowym

Planowane (karta MOB-029):
- [ ] Zwierzęta: tworzenie, lista, szczegóły, edycja (FR-02)
- [ ] Czynności opiekuńcze: pełny CRUD z przypisaniem do zwierzęcia (FR-01, FR-03, FR-04)
- [ ] Wyszukiwanie, filtrowanie, sortowanie (FR-05–FR-07)
- [ ] Walidacja i komunikaty błędów (FR-08, FR-09)
- [ ] Liczba czynności zwierzęcia w tygodniu (FR-10)
- [ ] Trwałe przechowywanie danych (FR-11)


## Znane ograniczenia

- Aplikacja jest testowana na ten moment tylko na Androidzie.
