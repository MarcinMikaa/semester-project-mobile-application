# Sprawozdanie — Laboratorium 1

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Student / identyfikator:** Marcin Mika / 147511
**Projekt biznesowy:** MOB-029 — PetCare  
**Framework:** React Native  
**Data zajęć:** 2026-10-22  
**Repozytorium:** https://github.com/MarcinMikaa/semester-project-mobile-application
**Commit / tag odpowiadający oddaniu:** tag `lab-01`

## 1. Cel laboratorium

Celem było wybranie technologii do projektu MOB-029 PetCare na podstawie wymagań karty, skonfigurowanie środowiska programistycznego, uruchomienie szkieletu aplikacji na emulatorze Androida oraz zorganizowanie pracy w repozytorium według przepływu Issue -> gałąź -> Pull Request -> merge.

## 2. Analiza technologii

**Dokument:** `docs/technology-comparison.md`  
**Najważniejsze różnice:** React Native i NativeScript wyświetlają natywne widoki platformy, a Flutter rysuje cały interfejs własnym silnikiem. NativeScript daje bezpośredni dostęp do API Androida i iOS z JavaScript, React Native korzysta z gotowych modułów Expo, a Flutter z platform channels. Najważniejsza dla mnie różnica dotyczy testowania: w React Native (Jest) i we Flutterze testy działają bez urządzenia, a w NativeScript wymagają urządzenia lub emulatora. Na Windows tylko Expo pozwala uruchomić aplikację na iPhonie bez Maca.  
**Źródła:** oficjalna dokumentacja React Native, Expo, Flutter i NativeScript, linki w dokumencie.

## 3. Decyzja technologiczna

**Dokument:** `docs/technology-decision.md`  
**Wymagania karty MOB-029 wpływające na wybór:**

1. **BR-04, FR-11:** czynność musi wskazywać istniejące zwierzę, usunięcie zwierzęcia z czynnościami jest blokowane, dane muszą przetrwać restart. Potrzebna jest lokalna baza z kluczami obcymi (expo-sqlite).
2. **FR-05–FR-07, FR-10:** wyszukiwanie, filtrowanie, sortowanie i liczba czynności zwierzęcia w tygodniu. Potrzebne są zapytania do bazy i spójna obsługa dat.
3. **BR-01 + TEST-02:** reguła 'czynność musi mieć rodzaj i datę' musi mieć test automatyczny w CI. Testy powinny więc działać bez emulatora.

**Dlaczego wybrano framework:** baza z kluczami obcymi jest częścią Expo SDK, testy działają w CI bez emulatora, a Expo Go pozwala pracować na Windows bez kompilowania kodu natywnego. Dodatkowo znam TypeScript i React.    
**Rozważona alternatywa:** NativeScript + Angular. Angulara używam w pracy, ale SQLite jest tam dostępny tylko przez wtyczkę społeczności, testy wymagają urządzenia, a na Windows nie zbuduję wersji iOS. Kompromis: rezygnuję z wykorzystania znajomości Angulara.  
**Ryzyka:**
1. Expo Go obsługuje tylko jedną wersję SDK, a Expo Go dla SDK 58 nie ma jeszcze w App Store, więc testuję na emulatorze Androida.
2. Expo SDK często się zmienia, więc zostaję na SDK 58 do końca semestru.

## 4. Konfiguracja środowiska

| Narzędzie | Wersja | Rola |
|---|---|---|
| System operacyjny | Windows 11 | system deweloperski |
| Framework / SDK | Expo SDK 58, React Native 0.88.1, TypeScript 6.0 | framework aplikacji |
| Runtime / menedżer pakietów | Node.js 22.22.2, npm 10.9.7 | narzędzia Expo, instalacja zależności |
| Emulator / urządzenie | Pixel 10 Pro, Android 16 (API 36), Expo Go | uruchamianie aplikacji |
| Edytor / IDE | VS Code, Android Studio 2026.2.2  | edycja kodu, Android SDK i emulator |

**Polecenia uruchomienia:**

```text
npm ci
npx expo start
a   (uruchomienie na emulatorze Androida)
```

**Wynik uruchomienia:** aplikacja uruchomiła się w Expo Go na emulatorze Pixel 10 Pro (API 36). Zrzut ekranu: `docs/images/lab-01-initial-screen.png`
**Weryfikacja po zmianie ekranu:** w `src/app/index.tsx` zmieniłem tekst na „MOB-029 PetCare”. Po zapisie pliku ekran zaktualizował się bez restartu aplikacji. Po ponownym uruchomieniu aplikacji z gałęzi `main`, już po scaleniu PR, tekst był nadal widoczny.

## 5. Praca z Git

- **Issue:**
  - #1 Przygotowanie środowiska i ekranu startowego: https://github.com/MarcinMikaa/semester-project-mobile-application/issues/1
  - #3 Dokumentacja laboratorium 1: https://github.com/MarcinMikaa/semester-project-mobile-application/issues/3
- **Gałąź:** `feature/initial-screen`, `docs/lab-01-documentation`
- **Pull Request:**
  - #2 ekran startowy: https://github.com/MarcinMikaa/semester-project-mobile-application/pull/2
  - #4 dokumentacja: https://github.com/MarcinMikaa/semester-project-mobile-application/pull/4
- **Commit(y):**
  - `e92ba28` chore: initialize expo project
  - `0238e3d` feat: show project name on initial screen
  - `2593800` docs: add initial screen screenshot
  - `538b1ef` docs: describe project setup in README
  - `f652b95` docs: add framework comparison
  - `c3de9a2` docs: add ADR-001 framework decision
- **Samoocena PR:** przejrzałem diff w zakładce „Files changed” (PR #2: 2 pliki, `index.tsx` i zrzut ekranu). Uruchomiłem aplikację z gałęzi, `npx tsc --noEmit` nie zgłosił błędów, w zmianach nie było plików generowanych ani sekretów.
- **Stan `main` po scaleniu:** po `git pull` aplikacja na `main` uruchamia się na emulatorze i pokazuje „MOB-029 PetCare”.


## 6. Dyskusja

**Wybór technologii dla scenariusza zespołu:** React Native z Expo  
**Dwa argumenty:**
1. Zespół zna TypeScript i React, więc nie traci czasu na naukę nowego języka.
2. Aparat, geolokalizacja i lokalna baza do trybu offline są dostępne jako moduły Expo SDK, co przy ograniczonym budżecie zmniejsza ryzyko integracji natywnych.

**Największe ryzyko:** tryb offline z synchronizacją danych. Rozwiązywanie konfliktów jest trudne niezależnie od frameworka.  
**Co mogłoby zmienić decyzję:** zespół znający Fluttera albo potrzeba zaawansowanego przetwarzania obrazu z kamery w czasie rzeczywistym.

## 7. Problemy i rozwiązania

| Problem / objaw | Hipoteza przyczyny | Działanie | Wynik |
|---|---|---|---|
| `adb` nierozpoznany, `ANDROID_HOME` pusty | brak Android SDK | instalacja Android Studio, SDK Platform 36, ustawienie `ANDROID_HOME` i `Path` | `adb --version` działa (1.0.41) |
| przykładowe ekrany szablonu zostały w projekcie | skrypt `reset-project` się nie wykonał | ręczne usunięcie przykładów, nadpisanie `_layout.tsx` i `index.tsx` | `npx tsc --noEmit` bez błędów, aplikacja działa |


## 8. Wnioski

1. Expo Go pozwala uruchomić aplikację bez kompilowania kodu natywnego, ale obsługuje tylko jedną wersję SDK, więc wybór wersji SDK decyduje o tym, na czym mogę testować.
2. Nietrafne okazało się założenie, że od razu przetestuję aplikację na iPhonie: Expo Go dla SDK 58 nie było jeszcze w App Store.
3. Przed laboratorium 2 należy zaprojektować model danych, warstwę danych (SQLite) i nawigację między ekranami.

## 9. Użycie narzędzi AI (jeżeli dotyczy)

**Narzędzie i zakres wsparcia:** asystent AI Claude pomagał w konfiguracji środowiska i rozwiązywaniu problemów:
- konfigurowanie Android Studio i zmienne `ANDROID_HOME` i `Path`,
- diagnoza błędu `adb is not recognized`,

**Jak zweryfikowano wynik:** każde polecenie uruchamiałem w terminalu i sprawdzałem wynik (`adb --version`, `adb devices`, `npx tsc --noEmit`, `git status` przed każdym commitem). Aplikację uruchomiłem na emulatorze Androida w Expo Go, także na `main` po scaleniu. Issues, Pull Requesty i historię sprawdziłem na GitHubie. 
**Elementy wykonane samodzielnie:** instalacja i konfiguracja środowiska, utworzenie i uporządkowanie projektu, zmiana ekranu startowego, wszystkie operacje Git i GitHub oraz ostateczny wybór technologii.


## 10. Checklista oddania

- [x] Porównanie trzech frameworków.
- [x] ADR wyboru technologii.
- [x] Uruchomiona aplikacja i instrukcja w README.
- [x] Issue, gałąź i scalony PR.
- [x] Linki do dowodów i historia pracy.
- [x] Problemy, wnioski i deklaracja AI (jeżeli dotyczy).
