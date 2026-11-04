# ADR-001: Wybór frameworka

**Data:** 2026-11-04
**Autor:** Marcin Mika

## Kontekst i wymagania

Aplikacja MOB-029 PetCare to dziennik opieki nad zwierzętam. Na wybór technologii wpływają wymagania karty:

1. **MOB-029-BR-04, FR-11** - czynność musi wskazywać istniejące zwierzę, usunięcie zwierzęcia z czynnościami jest blokowane, dane muszą przetrwać restart. Potrzebna jest lokalna relacyjna baza danych.
2. **MOB-029-FR-05–FR-07, FR-10** - wyszukiwanie, filtrowanie, sortowanie i liczba czynności zwierzęcia w tygodniu. Potrzebne są zapytania do bazy i spójna obsługa dat.
3. **MOB-029-BR-01** - reguła 'czynność musi mieć rodzaj i datę' musi mieć test automatyczny uruchamiany w CI. Testy powinny więc działać bez emulatora.

## Rozważone alternatywy

Porównanie trzech technologii: [`technology-comparison.md`](technology-comparison.md). Flutter odpada, bo wymaga nauki Darta i Maca do iOS.

- **A: React Native + Expo** - baza expo-sqlite jest częścią Expo SDK, testy w Jest działają w Node.js bez emulatora, Expo Go pozwala uruchomić aplikację na iPhonie bez Maca.
- **B: NativeScript + Angular** - wykorzystuję Angulara, którego używam w pracy. Słabe strony: SQLite tylko przez wtyczkę społeczności, testy ns test działają tylko na urządzeniu lub emulatorze, a na Windows nie zbuduję wersji na iOS.

## Decyzja

Wybieram **React Native z Expo (SDK 58) i TypeScriptem**. Platforma docelowa: Android (emulator, Expo Go).

## Uzasadnienie

1. **Baza z relacjami bez dodatkowej konfiguracji** - expo-sqlite obsługuje klucze obce i transakcje. W opcji B baza pochodzi z wtyczki społeczności.
2. **Testy w CI bez emulatora** - Jest działa w Node.js, więc testy przejdą w CI na zwykłym serwerze Linux. W opcji B testy wymagają urządzenia albo emulatora.
3. **Praca na Windows** - Expo Go nie wymaga kompilowania kodu natywnego, a aplikację można uruchomić na iPhonie bez Maca.
4. **Znajomość języka** - znam TypeScript i React oraz Angualra, ale inne punkty decydują o React.

## Konsekwencje i ryzyka

1. **Expo Go obsługuje tylko jedną wersję SDK**, a Expo Go dla SDK 58 nie ma jeszcze w App Store. Testuję więc na emulatorze Androida, w razie problemów przejdę na development build.
2. **Częste wydania Expo SDK** (trzy w 2026 r.). Zostaję na SDK 58 do końca semestru.
3. **Reacta znam słabiej niż Angulara**, co grozi wolniejszym startem. Logikę biznesową trzymam w czystym TypeScripcie, niezależnie od Reacta.

## Warunki ponownego rozpatrzenia decyzji

- Potrzebna biblioteka nie działa w Expo Go -> przejście na development build.
- Wymagane zaprezentowanie aplikacji na IOS, a Expo Go dla SDK 58 nadal nie ma w App Store -> build przez EAS.
- W innym projekcie, który współdzieli kod z istniejącą aplikacją Angular -> NativeScript + Angular.
