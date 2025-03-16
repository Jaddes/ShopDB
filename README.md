# 📌 Database Documentation - Store

## 📖 About the Project
This project is a database designed for efficient store management, enabling seamless handling of products, customers, orders, and system users. The long-term goal is to integrate this database with an application to create a fully functional sales system. I would like to let you know that the development of this project initially began in Serbian and will primarily continue in that language. However, an English version of the documentation is provided, as English is the de facto language for technical documentation and code on GitHub.

## 📂 Database Structure
The database consists of the following main tables:

- **CATEGORIES** - Product categories.
- **SUBCATEGORIES** - Subcategories linked to categories.
- **COLORS** - Available product colors.
- **TAGS** - Tags that products can have (e.g., premium, eco-friendly).
- **PRODUCTS** - The main table containing all products, their prices, and quantities.
- **USERS** - System user information.
- **CUSTOMERS** - Additional customer information.
- **MAIN_ORDERS** - Records details about customer orders.
- **ORDERS** - Items that make up individual orders.

## ⚙️ Key Features
✔ Relational database with well-defined primary and foreign keys.  
✔ **ON DELETE CASCADE** and **ON DELETE SET NULL** rules for maintaining data integrity.  
✔ Triggers and sequences for automatic order ID generation.  
✔ Automatic calculation of total order price using virtual columns.  
✔ CHECK constraints for data validation.

## 📥 Installation and Usage
1️⃣ **Download the SQL file containing the database schema.**  
2️⃣ **Run it in an Oracle SQL database using SQL Developer or the command line.**  
3️⃣ **Insert initial data using INSERT commands.**  
4️⃣ **Test queries and relationships using SELECT and JOIN queries.**

## 📌 Future Development Plan
🔹 Integration of the database with an application (web or mobile version).  
🔹 Development of an API service to connect the database with the user interface.  
🔹 Adding advanced features such as recommended products and purchase analysis.

## 📝 Authors
📌 **Author:** Boris Lahoš and Anja Stamenović
📌 **Contact:** borkolahos@gmail.com, github.com/Jaddes  

📌 **Note:** This project is open to contributions and can be further improved!

