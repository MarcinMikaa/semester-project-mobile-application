# Porównanie technologii: React Native, Flutter, NativeScript

**Projekt:** MOB-029 PetCare
**Data:** 2026-11-04
**Autor:** Marcin Mika

## 1. Język

- **React Native:** JavaScript/TypeScript, React
- **Flutter:** Dart
- **NativeScript:** JavaScript/TypeScript, UI w XML albo przez Angular, Vue, React
- **Ocena:** TypeScript znam, Dart byłby nowy, Angular z pracy przemawia za NativeScript.

## 2. Renderowanie UI

- **React Native:** komponenty zamieniane na natywne widoki platformy
- **Flutter:** własne widgety rysowane własnym silnikiem, bez kontrolek systemowych
- **NativeScript:** natywne widoki platformy
- **Ocena:** przy formularzach i listach nie przesądza o wyborze.

## 3. Dostęp do natywnych API

- **React Native:** gotowe moduły Expo, możliwość pisania własnych modułów natywnych
- **Flutter:** platform channels
- **NativeScript:** bezpośredni dostęp do API Androida i iOS z JavaScript
- **Ocena:** projekt potrzebuje tylko bazy danych i wyboru daty, więc liczą się gotowe moduły.

## 4. Android / iOS

- **React Native:** oba, Expo Go uruchamia aplikację bez budowania kodu natywnego, a iOS da się zbudować bez Maca
- **Flutter:** oba, build iOS wymaga macOS i Xcode
- **NativeScript:** oba, na Windows tylko Android
- **Ocena:** mam Windows i iPhona, tylko Expo daje iOS bez Maca.

## 5. Narzędzia

- **React Native:** Expo CLI, Fast Refresh, automatyczna instalacja Expo Go na emulatorze
- **Flutter:** flutter CLI, hot reload, DevTools
- **NativeScript:** ns CLI, na Windows wymaga JDK 21 i Android Studio
- **Ocena:** Expo Go nie kompiluje kodu natywnego, więc pętla pracy jest najkrótsza.

## 6. Testowanie

- **React Native:** Jest w Node.js, bez urządzenia
- **Flutter:** testy unit i widget bez urządzenia
- **NativeScript:** ns test na urządzeniu lub emulatorze
- **Ocena:** wymagane CI najprościej zrobić, gdy testy działają bez emulatora.

## 7. Ekosystem

- **React Native:** npm i pakiety Expo SDK wydawane razem z SDK
- **Flutter:** pakiety w pub.dev
- **NativeScript:** pakiety @nativescript i wtyczki społeczności
- **Ocena:** NativeScript ma najmniejszą społeczność, a SQLite tylko przez wtyczkę społeczności.

## 8. Ograniczenia

- **React Native:** Expo Go obsługuje jedną wersję SDK
- **Flutter:** wygląd platformy jest naśladowany, nie natywny
- **NativeScript:** testy tylko na urządzeniu, brak iOS na Windows
- **Ocena:** Flutter to nowy język, NativeScript niesie ryzyko porzuconych wtyczek.

## Wnioski

Realne opcje to React Native + Expo oraz NativeScript + Angular.
[`technology-decision.md`](technology-decision.md).

## Źródła

- React Native: https://reactnative.dev/docs/getting-started
- Expo: https://docs.expo.dev/
- Flutter: https://docs.flutter.dev/
- NativeScript: https://docs.nativescript.org/
