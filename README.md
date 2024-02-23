# zadanko-slider

## Dynamiczny Slider Najlepiej Sprzedających się Produktów na Stronie Produktu.

### Cel Zadania:
Stworzenie zaawansowanego, dynamicznego slidera na stronie produktu, który
wyświetla najlepiej sprzedające się produkty z tej samej kategorii (kolekcji) co
oglądany produkt. Slider powinien być responsywny, zgodny z dostarczonym
designem i łatwy do zarządzania z panelu administracyjnego Shopify.

### Wymagania Techniczne:
● HTML, SCSS, JavaScript (z użyciem SwiperJS): Implementacja
responsywnego slidera zgodnie z najlepszymi praktykami front-endowymi,
wykorzystując SwiperJS dla płynnej animacji i obsługi dotyku/swipe na
urządzeniach mobilnych.
● Liquid & Shopify API: Dynamiczne generowanie treści slidera, wykorzystując
Liquid do pobierania najlepiej sprzedających się produktów z tej samej
kategorii co oglądany produkt.
● Optymalizacja Wydajności: Implementacja technik optymalizacji
wydajności, takich jak lazy loading dla obrazów produktów.

### Zadania:
1. Wykrywanie Kategorii Aktualnego Produktu:
a. Użyj Liquid, aby zidentyfikować kolekcję/kategorię, do której należy
aktualnie przeglądany produkt.
2. Pobieranie Najlepiej Sprzedających się Produktów:
a. Zaimplementuj logikę w Liquid, która pobiera listę najlepiej
sprzedających się produktów z tej samej kategorii co oglądany
produkt. Rozważ użycie tagów produktów lub typów kolekcji do
filtracji.
b. Ogranicz liczbę wyświetlanych produktów w sliderze, np. do 10.
3. Tworzenie Slidera za pomocą SwiperJS:
a. Zbuduj strukturę HTML slidera i zainicjuj SwiperJS, aby umożliwić
dynamiczne przeglądanie produktów.
b. Upewnij się, że slider jest responsywny i działa płynnie na wszystkich
urządzeniach.
4. Stylizacja Slidera:
a. Użyj SCSS do stylizacji slidera zgodnie z dostarczonym designem.
Zapewnij odpowiedni wygląd zarówno na desktopie, jak i na
urządzeniach mobilnych.
5. Optymalizacja Wydajności:
a. Zaimplementuj lazy loading dla obrazów w sliderze, aby poprawić
szybkość ładowania strony produktu.

### Dokumentacja:
Przygotuj dokumentację opisującą logikę wyboru produktów do slidera, proces
integracji SwiperJS oraz wszelkie szczegóły konfiguracyjne niezbędne do
zarządzania sliderem.

### Kryteria Oceny:
Dokładność w implementacji logiki wyboru produktów i przypisywania ich do
odpowiedniej kategorii.
Czystość i modularność kodu HTML, SCSS oraz JavaScript.
Optymalizacja wydajności i dostępność slidera.
Zgodność z dostarczonym designem i responsywność.

### Dostarczenie Zadania:
Kod źródłowy projektu należy umieścić w repozytorium GitHub.
Dołącz linki do działającego demo slidera oraz dokumentację projektu.