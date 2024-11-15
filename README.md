# HTML Generator z OpenAI API

Ten projekt jest skryptem Node.js, który przekształca tekst z pliku `text.txt` na sformatowany kod HTML. Skrypt wykorzystuje API OpenAI do generowania struktury HTML na podstawie dostarczonej treści.

## Wymagania

1. **Node.js** (wersja 12.x lub nowsza)
2. **API Key OpenAI** (do uzyskania z [OpenAI](https://platform.openai.com/account/api-keys))

## Instalacja

1. **Klonuj repozytorium** lub pobierz pliki na swoje urządzenie.
2. **Zainstaluj zależności**, uruchamiając poniższą komendę w katalogu projektu:
  ```bash
  npm install
  ```

## Konfiguracja

1. W katalogu głównym projektu utwórz plik **.env**.
2. W pliku **.env** dodaj swój klucz API OpenAI w następującym formacie:
  ```bash
  OPENAI_API_KEY=twój_klucz_api
  ```

## Jak uruchomić skrypt

1. Upewnij się, że konfiguracja została poprawnie wykonana, a w pliku **text.txt** znajduje się treść, która ma być przetworzona.
2. Uruchom skrypt za pomocą poniższej komendy:
  ```bash
  node app.js
  ```
Po zakończeniu skryptu, w katalogu projektu zostanie utworzony plik **artykul.html** zawierający wygenerowany kod HTML :)
