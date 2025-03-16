CREATE TABLE CATEGORIES (
    id_category NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(255) NOT NULL
);

CREATE TABLE SUBCATEGORIES (
    id_subcategory NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_category NUMBER(10) NOT NULL,
    name VARCHAR2(255) NOT NULL,
    CONSTRAINT fk_subcategories_categories FOREIGN KEY (id_category) REFERENCES CATEGORIES(id_category) ON DELETE CASCADE
);

CREATE TABLE COLORS (
    id_color NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(255) NOT NULL
);

CREATE TABLE TAGS (
    id_tag NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(255) NOT NULL
);

CREATE TABLE PRODUCTS (
    id_product NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(255),
    id_subcategory NUMBER(10) NOT NULL,
    id_color NUMBER(10),
    id_tag NUMBER(10),
    acquisition_date DATE DEFAULT SYSDATE,
    purchase_price NUMBER(10,2) NOT NULL,
    selling_price NUMBER(10,2) NOT NULL,
    quantity NUMBER(10) NOT NULL CHECK (quantity >= 0),
    CONSTRAINT fk_products_subcategories FOREIGN KEY (id_subcategory) REFERENCES SUBCATEGORIES(id_subcategory) ON DELETE CASCADE,
    CONSTRAINT fk_products_colors FOREIGN KEY (id_color) REFERENCES COLORS(id_color) ON DELETE SET NULL,
    CONSTRAINT fk_products_tags FOREIGN KEY (id_tag) REFERENCES TAGS(id_tag) ON DELETE SET NULL
);

CREATE SEQUENCE seq_orders START WITH 1 INCREMENT BY 1;

CREATE TABLE ORDERS (
    id_order NUMBER(10) PRIMARY KEY,
    id_product NUMBER(10) NOT NULL,
    product_name VARCHAR2(255) NOT NULL,
    quantity NUMBER(10) NOT NULL CHECK (quantity > 0),
    price_per_unit NUMBER(10,2) NOT NULL CHECK (price_per_unit > 0),
    total_price NUMBER(10,2) GENERATED ALWAYS AS (quantity * price_per_unit) VIRTUAL,
    order_date DATE DEFAULT SYSDATE,
    status NUMBER(1) DEFAULT 0 CHECK (status IN (0, 1)),
    CONSTRAINT fk_orders_products FOREIGN KEY (id_product) REFERENCES PRODUCTS(id_product) ON DELETE CASCADE
);

CREATE OR REPLACE TRIGGER trg_orders
BEFORE INSERT ON ORDERS
FOR EACH ROW
BEGIN
    SELECT seq_orders.NEXTVAL INTO :NEW.id_order FROM DUAL;
END;
/

INSERT INTO CATEGORIES (name) VALUES ('Sunglasses');
INSERT INTO CATEGORIES (name) VALUES ('Bicycles');

INSERT INTO SUBCATEGORIES (id_category, name) VALUES (1, 'S1');
INSERT INTO SUBCATEGORIES (id_category, name) VALUES (1, 'Model X');
INSERT INTO SUBCATEGORIES (id_category, name) VALUES (2, 'MTB');

INSERT INTO COLORS (name) VALUES ('Blue');
INSERT INTO COLORS (name) VALUES ('Red');
INSERT INTO COLORS (name) VALUES ('Black');

INSERT INTO TAGS (name) VALUES ('C1');
INSERT INTO TAGS (name) VALUES ('C2');
INSERT INTO TAGS (name) VALUES ('C3');

INSERT INTO PRODUCTS (name, id_subcategory, id_color, id_tag, acquisition_date, purchase_price, selling_price, quantity)
VALUES ('Ray-Ban S1', 1, 1, NULL, TO_DATE('2024-03-10', 'YYYY-MM-DD'), 50.00, 80.00, 15);

INSERT INTO PRODUCTS (name, id_subcategory, id_color, id_tag, acquisition_date, purchase_price, selling_price, quantity)
VALUES ('Model X', 2, NULL, 2, TO_DATE('2024-03-12', 'YYYY-MM-DD'), 45.00, 70.00, 10);

INSERT INTO PRODUCTS (name, id_subcategory, id_color, id_tag, acquisition_date, purchase_price, selling_price, quantity)
VALUES ('Mountain MTB', 3, 3, 3, TO_DATE('2024-03-15', 'YYYY-MM-DD'), 600.00, 850.00, 5);

INSERT INTO ORDERS (id_product, product_name, quantity, price_per_unit, order_date, status)
VALUES (3, 'Mountain MTB', 5, 500.00, TO_DATE('2024-03-21', 'YYYY-MM-DD'), 1);

INSERT INTO ORDERS (id_product, product_name, quantity, price_per_unit, order_date, status)
VALUES (1, 'Ray-Ban S1', 10, 45.00, TO_DATE('2024-03-20', 'YYYY-MM-DD'), 0);

-- CATEGORIES
INSERT INTO CATEGORIES (name) VALUES ('Sunglasses');
INSERT INTO CATEGORIES (name) VALUES ('Bicycles');
INSERT INTO CATEGORIES (name) VALUES ('Watches');

-- SUBCATEGORIES
INSERT INTO SUBCATEGORIES (id_category, name) VALUES (1, 'S1');
INSERT INTO SUBCATEGORIES (id_category, name) VALUES (1, 'Model X');
INSERT INTO SUBCATEGORIES (id_category, name) VALUES (2, 'MTB');
INSERT INTO SUBCATEGORIES (id_category, name) VALUES (2, 'City Bike');

-- COLORS
INSERT INTO COLORS (name) VALUES ('Blue');
INSERT INTO COLORS (name) VALUES ('Red');
INSERT INTO COLORS (name) VALUES ('Black');
INSERT INTO COLORS (name) VALUES ('White');

-- TAGS
INSERT INTO TAGS (name) VALUES ('C1');
INSERT INTO TAGS (name) VALUES ('C2');
INSERT INTO TAGS (name) VALUES ('C3');
INSERT INTO TAGS (name) VALUES ('C4');

-- USERS
CREATE TABLE USERS (
    id_user NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100) NOT NULL,
    email VARCHAR2(255) NOT NULL UNIQUE,
    password VARCHAR2(255) NOT NULL,
    role VARCHAR2(20) DEFAULT 'customer' CHECK (role IN ('customer', 'administrator')),
    registration_date DATE DEFAULT SYSDATE
);

-- CUSTOMERS
CREATE TABLE CUSTOMERS (
    id_customer NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user NUMBER(10) NOT NULL,
    phone VARCHAR2(50),
    address VARCHAR2(255),
    CONSTRAINT fk_customers_users FOREIGN KEY (id_user) REFERENCES USERS(id_user) ON DELETE CASCADE
);

CREATE TABLE MAIN_ORDERS (
    id_main_order NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_customer NUMBER(10) NOT NULL,
    order_date DATE DEFAULT SYSDATE,
    status VARCHAR2(20) DEFAULT 'ordered' CHECK (status IN ('ordered', 'shipped', 'delivered')),
    delivery_method VARCHAR2(20) CHECK (delivery_method IN ('in-person', 'mail', 'cash-on-delivery')),
    delivery_price NUMBER(10,2) DEFAULT 0,
    total_price NUMBER(10,2) DEFAULT 0,
    CONSTRAINT fk_main_orders_customers FOREIGN KEY (id_customer) REFERENCES CUSTOMERS(id_customer) ON DELETE SET NULL
);

CREATE TABLE ORDER_ITEMS (
    id_order_item NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_main_order NUMBER(10) NOT NULL,
    id_product NUMBER(10) NOT NULL,
    quantity NUMBER(10) NOT NULL CHECK (quantity > 0),
    total_price NUMBER(10,2) NOT NULL,
    CONSTRAINT fk_order_items_products FOREIGN KEY (id_product) REFERENCES PRODUCTS(id_product) ON DELETE SET NULL,
    CONSTRAINT fk_order_items_main FOREIGN KEY (id_main_order) REFERENCES MAIN_ORDERS(id_main_order) ON DELETE CASCADE
);

INSERT INTO MAIN_ORDERS (id_customer, delivery_method, delivery_price)
VALUES (1, 'mail', 350);

INSERT INTO ORDER_ITEMS (id_main_order, id_product, quantity, total_price)
VALUES (1, 2, 3, 1500);

INSERT INTO ORDER_ITEMS (id_main_order, id_product, quantity, total_price)
VALUES (1, 3, 1, 500);
