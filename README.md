# TaskFlow

TaskFlow to prosta aplikacja do zarządzania zadaniami, zbudowana w Angularze. Pozwala dodawać i usuwać zadania, oznaczać je jako ukończone, filtrować oraz wyszukiwać po tytule. Wyświetla liczniki zadań i widok szczegółów zadania.

Dane są przechowywane w pamięci aplikacji: po odświeżeniu strony przywracana jest początkowa lista. Projekt nie korzysta z backendu.

## Technologie

- Angular 22 i TypeScript
- Angular Signals, Reactive Forms i Router
- Vitest do testów jednostkowych

## Uruchomienie

Potrzebne są Node.js i npm. W tym środowisku używane są Node.js 24 oraz npm 11.

```bash
npm install
npm start
```

Otwórz [http://localhost:4200/](http://localhost:4200/). Serwer deweloperski automatycznie odświeża aplikację po zmianach w plikach.

## Testy i build

```bash
npm test                  # testy w trybie obserwowania zmian
npm test -- --watch=false # jednokrotne uruchomienie testów
npm run build             # build produkcyjny w katalogu dist/
```

## Struktura

`TaskService` przechowuje zadania i udostępnia liczniki. `TaskList` obsługuje listę, formularz i filtrowanie, `TaskCard` prezentuje pojedyncze zadanie, a `TaskDetails` pokazuje szczegóły na podstawie identyfikatora w adresie.
