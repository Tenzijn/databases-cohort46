import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

let db = await mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const executeQuery = async (query) => {
  try {
    await db.query(query);
  } catch (err) {
    console.log(err);
  }
};

const setupDatabase = async () => {
  try {
    await executeQuery('DROP DATABASE IF EXISTS recipes_db');
    await executeQuery('CREATE DATABASE recipes_db');
    await executeQuery('USE recipes_db'); // I am getting an error here
    // db.end();
    // db = await mysql.createConnection({
    //   host: 'localhost',
    //   user: 'hyfuser',
    //   password: 'hyfpassword',
    //   database: 'recipes_db',
    // });
  } catch (err) {
    console.log('Error while setting up database: ', err);
  }
};

const createTables = async () => {
  try {
    await executeQuery(
      'CREATE TABLE recipes (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))'
    );
    await executeQuery(
      'CREATE TABLE ingredients (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), recipe_id INT, FOREIGN KEY (recipe_id) REFERENCES recipes(id))'
    );
    await executeQuery(
      'CREATE TABLE preparation_steps (id INT AUTO_INCREMENT PRIMARY KEY, description TEXT, recipe_id INT, FOREIGN KEY (recipe_id) REFERENCES recipes(id))'
    );
    await executeQuery(
      'CREATE TABLE categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), recipe_id INT, FOREIGN KEY (recipe_id) REFERENCES recipes(id))'
    );
  } catch (err) {
    console.log('Error while creating tables: ', err);
  }
};

const data = {
  recipes: [
    {
      name: 'Lasagna',
      ingredients: ['pasta', 'tomato sauce', 'cheese', 'meat'],
      preparationSteps: [
        'Boil the pasta',
        'Cook the meat',
        'Add tomato sauce to the meat',
        'Layer the lasagna',
        'Bake in the oven',
      ],
      categories: ['pasta', 'oven'],
    },
    {
      name: 'Tiramisu',
      ingredients: ['mascarpone', 'coffee', 'sugar', 'eggs'],
      preparationSteps: [
        'Mix the mascarpone, sugar, and eggs',
        'Dip the cookies in coffee',
        'Layer the tiramisu',
        'Refrigerate',
      ],
      categories: ['dessert', 'fridge'],
    },
    {
      name: 'Risotto',
      ingredients: ['rice', 'tomato sauce', 'cheese', 'meat'],
      preparationSteps: [
        'Boil the rice',
        'Cook the meat',
        'Add tomato sauce to the meat',
        'Layer the risotto',
        'Bake in the oven',
      ],
      categories: ['pasta', 'oven'],
    },
    {
      name: 'Pizza',
      ingredients: ['pizza dough', 'tomato sauce', 'cheese', 'meat'],
      preparationSteps: [
        'Boil the pizza dough',
        'Cook the meat',
        'Add tomato sauce to the meat',
        'Layer the pizza',
        'Bake in the oven',
      ],
      categories: ['pasta', 'oven'],
    },
    {
      name: 'Spaghetti',
      ingredients: ['spaghetti', 'tomato sauce', 'cheese', 'meat'],
      preparationSteps: [
        'Boil the spaghetti',
        'Cook the meat',
        'Add tomato sauce to the meat',
        'Layer the spaghetti',
        'Bake in the oven',
      ],
      categories: ['pasta', 'oven'],
    },
  ],
};

const insertData = async () => {
  data.recipes.forEach(async (recipe, recipeIndex) => {
    await executeQuery(`INSERT INTO recipes (name) VALUES ('${recipe.name}')`);
    recipe.ingredients.forEach(async (ingredient) => {
      await executeQuery(
        `INSERT INTO ingredients (name, recipe_id) VALUES ('${ingredient}', ${
          recipeIndex + 1
        })`
      );
    });
    recipe.preparationSteps.forEach(async (preparationStep) => {
      await executeQuery(
        `INSERT INTO preparation_steps (description, recipe_id) VALUES ('${preparationStep}', ${
          recipeIndex + 1
        })`
      );
    });
    recipe.categories.forEach(async (category) => {
      await executeQuery(
        `INSERT INTO categories (name, recipe_id) VALUES ('${category}', ${
          recipeIndex + 1
        })`
      );
    });
  });
};

const initializeDatabase = async () => {
  try {
    await setupDatabase();
    await createTables();
    await insertData();
  } catch (err) {
    console.log(err);
  }
};

initializeDatabase();

export default app;
