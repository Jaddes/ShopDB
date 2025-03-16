# 📌 Dokumentacija baze podataka - Prodavnica

## 📖 O projektu
Ovaj projekat predstavlja bazu podataka dizajniranu za upravljanje prodavnicom. Baza omogućava efikasno upravljanje proizvodima, kupcima, narudžbinama i korisnicima sistema. Cilj projekta je da se ova baza podataka kasnije integriše sa aplikacijom kako bi se formirao kompletan prodajni sistem.

## 📂 Struktura baze podataka
Baza se sastoji iz sledećih glavnih tabela:

- **KATEGORIJE** - Kategorije proizvoda.
- **PODKATEGORIJE** - Podkategorije povezane sa kategorijama.
- **BOJE** - Dostupne boje proizvoda.
- **OZNAKE** - Oznake koje proizvodi mogu imati (npr. premium, ekološki).
- **PROIZVODI** - Glavna tabela sa svim proizvodima, njihovim cenama i količinama.
- **KORISNICI** - Podaci o korisnicima sistema.
- **KUPCI** - Dodatne informacije o kupcima.
- **GLAVNA_NARUDZBINA** - Beleži podatke o narudžbinama.
- **PORUDŽBINE** - Stavke koje čine pojedinačnu narudžbinu.

## ⚙️ Ključne funkcionalnosti
✔ Relaciona baza podataka sa jasno definisanim primarnim i stranim ključevima.  
✔ **ON DELETE CASCADE** i **ON DELETE SET NULL** pravila za održavanje integriteta podataka.  
✔ Trigeri i sekvence za automatsko generisanje ID vrednosti narudžbina.  
✔ Automatsko računanje ukupne cene porudžbina pomoću virtualnih kolona.  
✔ CHECK ograničenja za validaciju unetih podataka.

## 📥 Instalacija i korišćenje
1️⃣ **Preuzmite SQL fajl sa šemom baze podataka.**  
2️⃣ **Pokrenite ga u Oracle SQL bazi pomoću SQL Developer-a ili komandne linije.**  
3️⃣ **Unesite početne podatke korišćenjem INSERT komandi.**  
4️⃣ **Testirajte upite i relacije pomoću SELECT i JOIN upita.**

## 📌 Plan daljeg razvoja
🔹 Integracija baze sa aplikacijom (web ili mobilna verzija).  
🔹 Razvoj API servisa za povezivanje baze sa korisničkim interfejsom.  
🔹 Dodavanje naprednih funkcionalnosti, kao što su preporučeni proizvodi i analiza kupovine.

## 📝 Autori
📌 **Autor:** Boris Lahoš, Anja Stamenović 
📌 **Kontakt:** borkolahos@gmail, github.com/Jaddes

📌 **Napomena:** Ovaj projekat je otvoren za doprinose i može se dalje unapređivati!

