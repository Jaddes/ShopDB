-- Tabela za korisnike koji se mogu ulogovati
CREATE TABLE KORISNICI (
    id_korisnik NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ime VARCHAR2(100) NOT NULL,
    prezime VARCHAR2(100) NOT NULL,
    email VARCHAR2(255) UNIQUE NOT NULL,
    lozinka VARCHAR2(255) NOT NULL,
    uloga VARCHAR2(20) DEFAULT 'kupac' CHECK (uloga IN ('kupac', 'administrator')),
    datum_registracije DATE DEFAULT SYSDATE
);

-- Tabela za kupce koji imaju dodatne informacije za isporuku
CREATE TABLE KUPCI (
    id_kupac NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_korisnik NUMBER NOT NULL,
    telefon VARCHAR2(50),
    CONSTRAINT fk_kupci_korisnici FOREIGN KEY (id_korisnik) REFERENCES KORISNICI(id_korisnik) ON DELETE CASCADE
);

CREATE TABLE ADRESE (
    id_adresa NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ulica VARCHAR2(100),
    broj VARCHAR2(10),
    grad VARCHAR2(100),
    postanski_broj VARCHAR2(10)
);


CREATE TABLE KORISNICKE_ADRESE (
    id_kor_adr NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kupac NUMBER NOT NULL,
    id_adresa NUMBER NOT NULL,
    CONSTRAINT fk_kor_adr_kupci FOREIGN KEY (id_kupac) REFERENCES KUPCI(id_kupac) ON DELETE CASCADE,
    CONSTRAINT fk_kor_adr_adrese FOREIGN KEY (id_adresa) REFERENCES ADRESE(id_adresa) ON DELETE CASCADE
);

-- Glavna narudžbina, jedna po korisniku
CREATE TABLE NARUDZBINE (
    id_narudzbina NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kor_adr NUMBER NOT NULL,
    datum_narudzbine DATE DEFAULT SYSDATE,
    status VARCHAR2(20) DEFAULT 'naručeno' CHECK (status IN ('naručeno', 'poslato', 'stiglo')),
    nacin_dostave VARCHAR2(20) CHECK (nacin_dostave IN ('lično', 'pošta', 'pouzećem')),
    cena_dostave NUMBER(10, 2) DEFAULT 0,
    ukupna_cena NUMBER(10, 2),
    CONSTRAINT fk_narudzbine_kor_adr FOREIGN KEY (id_kor_adr) REFERENCES KORISNICKE_ADRESE(id_kor_adr) ON DELETE SET NULL
);

-- Stavke narudžbine (proizvodi unutar jedne narudžbine)
CREATE TABLE STAVKE_NARUDZBINE (
    id_stavka_narudzbine NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_narudzbina NUMBER NOT NULL,
    id_proizvod NUMBER NOT NULL,
    kolicina NUMBER NOT NULL CHECK (kolicina > 0),
    cena_po_komadu NUMBER(10,2) NOT NULL,
    ukupna_cena NUMBER(10,2) GENERATED ALWAYS AS (kolicina * cena_po_komadu) VIRTUAL,
    CONSTRAINT fk_stavka_narudzbine FOREIGN KEY (id_narudzbina) REFERENCES NARUDZBINE(id_narudzbina) ON DELETE CASCADE,
    CONSTRAINT fk_stavka_narudzbina_proizvod FOREIGN KEY (id_proizvod) REFERENCES PROIZVODI(id_proizvod)
);

CREATE TABLE PROIZVODI (
    id_proizvod NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(255) NOT NULL,
    opis VARCHAR2(1000),
    id_podkategorija NUMBER NOT NULL,
    id_boja NUMBER,
    id_oznaka NUMBER,
    slika_url VARCHAR2(255),
    datum_nabavke DATE DEFAULT SYSDATE,
    nabavna_cena NUMBER(10, 2) NOT NULL,
    prodajna_cena NUMBER(10, 2) NOT NULL,
    kolicina NUMBER DEFAULT 0 CHECK (kolicina >= 0),
    CONSTRAINT fk_proizvod_podkategorija FOREIGN KEY (id_podkategorija) REFERENCES PODKATEGORIJE(id_podkategorija),
    CONSTRAINT fk_proizvod_boja FOREIGN KEY (id_boja) REFERENCES BOJE(id_boja),
    CONSTRAINT fk_proizvod_oznaka FOREIGN KEY (id_oznaka) REFERENCES OZNAKE(id_oznaka)
);

-- Svaki korisnik ima svoju korpu
CREATE TABLE KORPA (
    id_korpa NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kupac NUMBER NOT NULL,
    sifra NUMBER NOT NULL,
    id_stavka_korpe NUMBER NOT NULL,
    datum_kreiranja DATE DEFAULT SYSDATE,
    CONSTRAINT fk_korpa_kupac FOREIGN KEY (id_kupac) REFERENCES KUPCI(id_kupac) ON DELETE CASCADE,
    CONSTRAINT fk_stavke_korpe_korpa FOREIGN KEY (id_stavka_korpe ) REFERENCES STAVKE_KORPE(id_korpa) ON DELETE CASCADE
);

-- Stavke unutar korpe
CREATE TABLE STAVKE_KORPE (
    id_stavka_korpe NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_korpa NUMBER NOT NULL,
    id_proizvod NUMBER NOT NULL,
    kolicina NUMBER NOT NULL CHECK (kolicina > 0),
    CONSTRAINT fk_stavke_korpe_proizvod FOREIGN KEY (id_proizvod) REFERENCES PROIZVODI(id_proizvod),
    CONSTRAINT fk_korpa_kupac FOREIGN KEY (id_kupac) REFERENCES KUPCI(id_kupac) ON DELETE CASCADE
);

-- Wishlist povezan sa korisnikom (kupcem)
CREATE TABLE WISHLIST (
    id_wishlist NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kupac NUMBER NOT NULL,
    datum_kreiranja DATE DEFAULT SYSDATE,
    CONSTRAINT fk_wishlist_kupac FOREIGN KEY (id_kupac) REFERENCES KUPCI(id_kupac) ON DELETE CASCADE
);

-- Stavke unutar liste želja
CREATE TABLE WISHLIST_STAVKE (
    id_stavka_wishlist NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_wishlist NUMBER NOT NULL,
    id_proizvod NUMBER NOT NULL,
    CONSTRAINT fk_stavka_wishlist FOREIGN KEY (id_wishlist) REFERENCES WISHLIST(id_wishlist) ON DELETE CASCADE,
    CONSTRAINT fk_stavka_proizvod FOREIGN KEY (id_proizvod) REFERENCES PROIZVODI(id_proizvod)
);

CREATE TABLE BOJE (
    id_boja NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(50) NOT NULL
);

CREATE TABLE OZNAKE (
    id_oznaka NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(50) NOT NULL
);

CREATE TABLE KATEGORIJE (
    id_kategorija NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(100) NOT NULL
);

CREATE TABLE PODKATEGORIJE (
    id_podkategorija NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kategorija NUMBER NOT NULL,
    naziv VARCHAR2(100) NOT NULL,
    CONSTRAINT fk_podkategorija_kategorija FOREIGN KEY (id_kategorija) REFERENCES KATEGORIJE(id_kategorija) ON DELETE CASCADE
);

CREATE TABLE RECENZIJE (
    id_recenzija NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kupac NUMBER NOT NULL,
    id_proizvod NUMBER NOT NULL,
    ocena NUMBER(1) NOT NULL CHECK (ocena BETWEEN 1 AND 5),
    komentar VARCHAR2(1000),
    datum DATE DEFAULT SYSDATE,
    CONSTRAINT fk_recenzije_kupac FOREIGN KEY (id_kupac) REFERENCES KUPCI(id_kupac) ON DELETE CASCADE,
    CONSTRAINT fk_recenzije_proizvod FOREIGN KEY (id_proizvod) REFERENCES PROIZVODI(id_proizvod) ON DELETE CASCADE
);
