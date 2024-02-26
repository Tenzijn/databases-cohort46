--drop recipesDB if exist;
DROP DATABASE IF EXISTS recipesDB;
CREATE DATABASE recipesDB;
USE recipesDB;

CREATE TABLE recipes (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
  );

CREATE TABLE ingredients (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
  );

CREATE TABLE categories (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
  );

  CREATE TABLE steps (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL
  );

CREATE TABLE recipe_ingredients (
  recipe_id int,
  ingredient_id int,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE recipe_categories (
  recipe_id int,
  category_id int,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE recipe_steps (
  recipe_id int,
  step_id int,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (step_id) REFERENCES steps(id)
);

-- Show tables
SHOW TABLES;

-- Insert data
INSERT INTO recipes (name) VALUES
('Spaghetti Bolognese'),
('Spaghetti Carbonara'),
('Spaghetti Arrabiata');

INSERT INTO ingredients (name) VALUES
('Spaghetti'),
('Tomato Sauce'),
('Pasta'),
('Bacon'),
('Eggs'),
('Cheese'),
('Mozzarella'),
('Basil');

INSERT INTO categories (name) VALUES
('Italian'),
('Fast Food'),
('Indian');

INSERT INTO steps (name) VALUES
('Boil the spaghetti'),
('Cook the bacon'),
('Mix the ingredients'),
('Assemble the dish'),
('Bake the spaghetti');

SELECT * FROM recipes;
SELECT * FROM ingredients;
SELECT * FROM categories;
SELECT * FROM steps;

-- Learning MYSQL

USE sql_store;
-- Show tables
SHOW TABLES;

SELECT * FROM sql_store.customers;
SELECT * FROM sql_store.orders;
SELECT * FROM sql_store.order_items;

SELECT * FROM orders
WHERE order_date > '2019-01-01';

SELECT * FROM orders
WHERE order_date BETWEEN '2018-01-01' AND '2019-12-31';

SELECT *
FROM customers
-- WHERE state = 'CA' OR state = 'NY' OR state = 'FL';
WHERE state NOT IN ('CA', 'NY', 'FL');

SELECT *
FROM customers
ORDER BY points DESC
LIMIT 3;

SELECT order_id, o.customer_id, first_name, last_name
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id;



SELECT order_id, oi.product_id, name, quantity, oi.unit_price
FROM order_items oi 
JOIN products p
  ON oi.product_id = p.product_id;

--self join
USE sql_hr;

SELECT e.employee_id, e.first_name, m.first_name AS manager
FROM employees e
JOIN employees m
  ON e.reports_to = m.employee_id;


use sql_store;

SELECT 
  o.order_id,
  o.order_date,
  o.customer_id,
  c.first_name,
  c.last_name,
  os.name
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
JOIN order_statuses os
  on o.status = os.order_status_id;


use sql_invoicing;

SELECT p.date, c.name, p.amount, pm.name
FROM payments p
JOIN clients c
  ON p.client_id = c.client_id
JOIN payment_methods pm
  ON p.payment_method = pm.payment_method_id;


USE recipes_db;

SELECT r.id, r.name, i.name 
FROM recipes r
JOIN ingredients i
  ON r.id = i.recipe_id
WHERE i.name = 'meat';

