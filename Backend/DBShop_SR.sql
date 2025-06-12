CREATE TABLE KATEGORIJE (
    id_kategorija NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(255) NOT NULL
);

CREATE TABLE PODKATEGORIJE (
    id_podkategorija NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kategorija NUMBER(10) NOT NULL,
    naziv VARCHAR2(255) NOT NULL,
    CONSTRAINT fk_podkategorije_kategorije FOREIGN KEY (id_kategorija) REFERENCES KATEGORIJE(id_kategorija) ON DELETE CASCADE
);

CREATE TABLE BOJE (
    id_boja NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(255) NOT NULL
);

CREATE TABLE OZNAKE (
    id_oznaka NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(255) NOT NULL
);

CREATE TABLE PROIZVODI (
    id_proizvod NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    naziv VARCHAR2(255),
    id_podkategorija NUMBER(10) NOT NULL,
    id_boja NUMBER(10),
    id_oznaka NUMBER(10),
    datum_nabavke DATE DEFAULT SYSDATE,
    nabavna_cena NUMBER(10,2) NOT NULL,
    prodajna_cena NUMBER(10,2) NOT NULL,
    kolicina NUMBER(10) NOT NULL CHECK (kolicina >= 0),
    CONSTRAINT fk_proizvodi_podkategorije FOREIGN KEY (id_podkategorija) REFERENCES PODKATEGORIJE(id_podkategorija) ON DELETE CASCADE,
    CONSTRAINT fk_proizvodi_boje FOREIGN KEY (id_boja) REFERENCES BOJE(id_boja) ON DELETE SET NULL,
    CONSTRAINT fk_proizvodi_oznake FOREIGN KEY (id_oznaka) REFERENCES OZNAKE(id_oznaka) ON DELETE SET NULL
);

CREATE SEQUENCE seq_narudzbine START WITH 1 INCREMENT BY 1;

CREATE TABLE NARUDZBINE (
    id_narudzbina NUMBER(10) PRIMARY KEY,
    id_proizvod NUMBER(10) NOT NULL,
    kolicina NUMBER(10) NOT NULL CHECK (kolicina > 0),
    ukupna_cena NUMBER(10,2) GENERATED ALWAYS AS (kolicina * cena_po_komadu) VIRTUAL,
    datum_narudzbine DATE DEFAULT SYSDATE,
    status NUMBER(1) DEFAULT 0 CHECK (status IN (0, 1)),
    CONSTRAINT fk_narudzbine_proizvodi FOREIGN KEY (id_proizvod) REFERENCES PROIZVODI(id_proizvod) ON DELETE CASCADE
);

CREATE OR REPLACE TRIGGER trg_narudzbine
BEFORE INSERT ON NARUDZBINE
FOR EACH ROW
BEGIN
    SELECT seq_narudzbine.NEXTVAL INTO :NEW.id_narudzbina FROM DUAL;
END;
/

INSERT INTO KATEGORIJE (naziv) VALUES ('Naočare za sunce');
INSERT INTO KATEGORIJE (naziv) VALUES ('Bicikli');

INSERT INTO PODKATEGORIJE (id_kategorija, naziv) VALUES (1, 'S1');
INSERT INTO PODKATEGORIJE (id_kategorija, naziv) VALUES (1, 'Model X');
INSERT INTO PODKATEGORIJE (id_kategorija, naziv) VALUES (2, 'MTB');

INSERT INTO BOJE (naziv) VALUES ('Plava');
INSERT INTO BOJE (naziv) VALUES ('Crvena');
INSERT INTO BOJE (naziv) VALUES ('Crna');

INSERT INTO OZNAKE (naziv) VALUES ('C1');
INSERT INTO OZNAKE (naziv) VALUES ('C2');
INSERT INTO OZNAKE (naziv) VALUES ('C3');

INSERT INTO PROIZVODI (naziv, id_podkategorija, id_boja, id_oznaka, datum_nabavke, nabavna_cena, prodajna_cena, kolicina)
VALUES ('Ray-Ban S1', 1, 1, NULL, TO_DATE('2024-03-10', 'YYYY-MM-DD'), 50.00, 80.00, 15);

INSERT INTO PROIZVODI (naziv, id_podkategorija, id_boja, id_oznaka, datum_nabavke, nabavna_cena, prodajna_cena, kolicina)
VALUES ('Model X', 2, NULL, 2, TO_DATE('2024-03-12', 'YYYY-MM-DD'), 45.00, 70.00, 10);

INSERT INTO PROIZVODI (naziv, id_podkategorija, id_boja, id_oznaka, datum_nabavke, nabavna_cena, prodajna_cena, kolicina)
VALUES ('Gorski MTB', 3, 3, 3, TO_DATE('2024-03-15', 'YYYY-MM-DD'), 600.00, 850.00, 5);

INSERT INTO NARUDZBINE (id_proizvod, naziv_proizvoda, kolicina, cena_po_komadu, datum_narudzbine, status)
VALUES (3, 'Gorski MTB', 5, 500.00, TO_DATE('2024-03-21', 'YYYY-MM-DD'), 1);

INSERT INTO NARUDZBINE (id_proizvod, naziv_proizvoda, kolicina, cena_po_komadu, datum_narudzbine, status)
VALUES (1, 'Ray-Ban S1', 10, 45.00, TO_DATE('2024-03-20', 'YYYY-MM-DD'), 0);


-- KATEGORIJE
INSERT INTO KATEGORIJE (naziv) VALUES ('Naočare za sunce');
INSERT INTO KATEGORIJE (naziv) VALUES ('Bicikli');
INSERT INTO KATEGORIJE (naziv) VALUES ('Satovi');

-- PODKATEGORIJE
INSERT INTO PODKATEGORIJE (id_kategorija, naziv) VALUES (1, 'S1');
INSERT INTO PODKATEGORIJE (id_kategorija, naziv) VALUES (1, 'Model X');
INSERT INTO PODKATEGORIJE (id_kategorija, naziv) VALUES (2, 'MTB');
INSERT INTO PODKATEGORIJE (id_kategorija, naziv) VALUES (2, 'Gradski bicikl');

-- BOJE
INSERT INTO BOJE (naziv) VALUES ('Plava');
INSERT INTO BOJE (naziv) VALUES ('Crvena');
INSERT INTO BOJE (naziv) VALUES ('Crna');
INSERT INTO BOJE (naziv) VALUES ('Bela');

-- OZNAKE
INSERT INTO OZNAKE (naziv) VALUES ('C1');
INSERT INTO OZNAKE (naziv) VALUES ('C2');
INSERT INTO OZNAKE (naziv) VALUES ('C3');
INSERT INTO OZNAKE (naziv) VALUES ('C4');

-- PROIZVODI
INSERT INTO PROIZVODI (naziv, id_podkategorija, id_boja, id_oznaka, datum_nabavke, nabavna_cena, prodajna_cena, kolicina)
VALUES ('Ray-Ban S1', 1, 1, 1, TO_DATE('2024-03-10', 'YYYY-MM-DD'), 50.00, 80.00, 15);

INSERT INTO PROIZVODI (naziv, id_podkategorija, id_boja, id_oznaka, datum_nabavke, nabavna_cena, prodajna_cena, kolicina)
VALUES ('Naočare Model X', 2, NULL, 2, TO_DATE('2024-03-12', 'YYYY-MM-DD'), 45.00, 70.00, 10);

INSERT INTO PROIZVODI (naziv, id_podkategorija, id_boja, id_oznaka, datum_nabavke, nabavna_cena, prodajna_cena, kolicina)
VALUES ('Gorski MTB', 3, 3, 3, TO_DATE('2024-03-15', 'YYYY-MM-DD'), 600.00, 850.00, 5);

INSERT INTO PROIZVODI (naziv, id_podkategorija, id_boja, id_oznaka, datum_nabavke, nabavna_cena, prodajna_cena, kolicina)
VALUES ('Gradski bicikl CityRide', 4, NULL, 4, TO_DATE('2024-03-18', 'YYYY-MM-DD'), 400.00, 600.00, 8);

-- NARUDZBINE
INSERT INTO NARUDZBINE (id_proizvod, naziv_proizvoda, kolicina, cena_po_komadu, datum_narudzbine, status)
VALUES (1, 'Ray-Ban S1', 10, 45.00, TO_DATE('2024-03-20', 'YYYY-MM-DD'), 0);

INSERT INTO NARUDZBINE (id_proizvod, naziv_proizvoda, kolicina, cena_po_komadu, datum_narudzbine, status)
VALUES (3, 'Gorski MTB', 5, 500.00, TO_DATE('2024-03-21', 'YYYY-MM-DD'), 1);

INSERT INTO NARUDZBINE (id_proizvod, naziv_proizvoda, kolicina, cena_po_komadu, datum_narudzbine, status)
VALUES (4, 'Gradski bicikl CityRide', 2, 550.00, TO_DATE('2024-03-27', 'YYYY-MM-DD'), 0);

-- KORISNICI
CREATE TABLE KORISNICI (
    id_korisnik NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ime VARCHAR2(100) NOT NULL,
    prezime VARCHAR2(100) NOT NULL,
    email VARCHAR2(255) NOT NULL UNIQUE,
    lozinka VARCHAR2(255) NOT NULL,
    uloga VARCHAR2(20) DEFAULT 'kupac' CHECK (uloga IN ('kupac', 'administrator')),
    datum_registracije DATE DEFAULT SYSDATE
);

-- KUPCI
CREATE TABLE KUPCI (
    id_kupac NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_korisnik NUMBER(10) NOT NULL,
    telefon VARCHAR2(50),
    adresa VARCHAR2(255),
    CONSTRAINT fk_kupci_korisnici FOREIGN KEY (id_korisnik) REFERENCES KORISNICI(id_korisnik) ON DELETE CASCADE
);

CREATE TABLE PORUDZBINE (
    id_porudzbina NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_proizvod NUMBER(10) NOT NULL,
    id_kupac NUMBER(10) NOT NULL,
    kolicina NUMBER(10) NOT NULL CHECK (kolicina > 0),
    ukupna_cena NUMBER(10,2) NOT NULL,
    datum_porudzbine DATE DEFAULT SYSDATE,
    status VARCHAR2(20) DEFAULT 'naruceno' CHECK (status IN ('naruceno', 'poslato', 'stiglo')),
    nacin_dostave VARCHAR2(20) CHECK (nacin_dostave IN ('licno', 'posta', 'pouzecem')),
    cena_dostave NUMBER(10,2) DEFAULT 0,
    CONSTRAINT fk_porudzbine_proizvod FOREIGN KEY (id_proizvod) REFERENCES PROIZVODI(id_proizvod) ON DELETE SET NULL,
    CONSTRAINT fk_porudzbine_kupac FOREIGN KEY (id_kupac) REFERENCES KUPCI(id_kupac) ON DELETE SET NULL
);

INSERT INTO KORISNICI (ime, prezime, email, lozinka, uloga)
VALUES ('Marko', 'Markovic', 'marko@gmail.com', 'password123', 'kupac');

INSERT INTO KORISNICI (ime, prezime, email, lozinka, uloga)
VALUES ('Jelena', 'Jovanovic', 'jelena@gmail.com', 'pass456', 'kupac');

INSERT INTO KORISNICI (ime, prezime, email, lozinka, uloga)
VALUES ('Admin', 'Adminovic', 'admin@gmail.com', 'adminpass', 'administrator');

INSERT INTO KUPCI (id_korisnik, telefon, adresa)
VALUES (1, '+381641234567', 'Bulevar Oslobodjenja 10, Novi Sad');

INSERT INTO KUPCI (id_korisnik, telefon, adresa)
VALUES (2, '+38163111222', 'Kralja Petra 15, Beograd');


DROP TABLE PORUDZBINE CASCADE CONSTRAINTS PURGE;

CREATE TABLE GLAVNA_NARUDZBINA (
    id_glavna_narudzbina NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_kupac NUMBER(10) NOT NULL,
    datum_porudzbine DATE DEFAULT SYSDATE,
    status VARCHAR2(20) DEFAULT 'naruceno' CHECK (status IN ('naruceno', 'poslato', 'stiglo')),
    nacin_dostave VARCHAR2(20) CHECK (nacin_dostave IN ('licno', 'posta', 'pouzecem')),
    cena_dostave NUMBER(10,2) DEFAULT 0,
    ukupna_cena NUMBER(10,2) DEFAULT 0,
    CONSTRAINT fk_glavna_narudzbina_kupci FOREIGN KEY (id_kupac) REFERENCES KUPCI(id_kupac) ON DELETE SET NULL
);

CREATE TABLE PORUDZBINE (
    id_porudzbina NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_glavna_narudzbina NUMBER(10) NOT NULL,
    id_proizvod NUMBER(10) NOT NULL,
    kolicina NUMBER(10) NOT NULL CHECK (kolicina > 0),
    ukupna_cena NUMBER(10,2) NOT NULL,
    CONSTRAINT fk_porudzbine_proizvodi FOREIGN KEY (id_proizvod) REFERENCES PROIZVODI(id_proizvod) ON DELETE SET NULL,
    CONSTRAINT fk_porudzbine_glavna FOREIGN KEY (id_glavna_narudzbina) REFERENCES GLAVNA_NARUDZBINA(id_glavna_narudzbina) ON DELETE CASCADE
);

INSERT INTO GLAVNA_NARUDZBINA (id_kupac, nacin_dostave, cena_dostave)
VALUES (1, 'posta', 350);

INSERT INTO PORUDZBINE (id_glavna_narudzbina, id_proizvod, kolicina, ukupna_cena)
VALUES (1, 2, 3, 1500);

INSERT INTO PORUDZBINE (id_glavna_narudzbina, id_proizvod, kolicina, ukupna_cena)
VALUES (1, 3, 1, 500);

CREATE USER shop IDENTIFIED BY shop123;
GRANT CONNECT, RESOURCE TO shop;
ALTER USER shop DEFAULT TABLESPACE users QUOTA UNLIMITED ON users;