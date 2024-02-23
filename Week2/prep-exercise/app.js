import express from 'express';

import db from './util/db_connection.js';

const app = express();

const dropDatabase = async () => {
  try {
    await db.query('DROP DATABASE IF EXISTS recipes');
    console.log('Database dropped');
  } catch (err) {
    console.log(err);
  }
};

// drop the database if it exists this should be done only once
// dropDatabase();

const executeQuery = async (query) => {
  try {
    const result = await db.execute(query);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// create the database if it does not exist
// executeQuery('CREATE DATABASE IF NOT EXISTS recipes');
// executeQuery('USE recipes');

const selectDB = async () => {
  await db
    .query('USE recipes')
    .then(() => {
      console.log('Database selected');
    })
    .catch((err) => {
      console.log(err);
    });
};

selectDB();

// create the recipes  table if it does not exist
executeQuery(`CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
)`);

//create categories table if it does not exist
executeQuery(`CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
)`);

//create ingredients table if it does not exist
executeQuery(`CREATE TABLE IF NOT EXISTS ingredients 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
)`);

//create steps table if it does not exist
executeQuery(`CREATE TABLE IF NOT EXISTS steps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  step_number INT,
  description TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
)`);

//create recipe_categories table if it does not exist
executeQuery(`CREATE TABLE IF NOT EXISTS recipe_categories (
id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  category_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
)`);

//create recipe_ingredients table if it does not exist
executeQuery(`CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  ingredient_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
)`);

export default app;
