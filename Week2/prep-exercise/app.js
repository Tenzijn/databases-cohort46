import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

let db = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'recipes_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const recipes = {
  No_Bake_Cheesecake: {
    categories: ['Cake', 'No-Bake', 'Vegetarian'],
    ingredients: [
      'Condensed milk',
      'Cream Cheese',
      'Lemon Juice',
      'Pie Crust',
      'Cherry Jam',
    ],
    steps: [
      'Beat Cream Cheese',
      'Add condensed Milk and blend',
      'Add Lemon Juice and blend',
      'Add the mix to the pie crust',
      'Spread the Cherry Jam',
      'Place in refrigerator for 3h.',
    ],
  },
  Roasted_Brussels_Sprouts: {
    categories: ['Vegan', 'Gluten-Free'],
    ingredients: [
      'Brussels Sprouts',
      'Lemon juice',
      'Sesame seeds',
      'Pepper',
      'Salt',
      'Olive oil',
    ],
    steps: [
      'Preheat the oven',
      'Mix the ingredients in a bowl',
      'Spread the mix on baking sheet',
      "Bake for 30'",
    ],
  },
  Mac_and_Cheese: {
    categories: ['Vegetarian'],
    ingredients: [
      'Macaroni',
      'Butter',
      'Flour',
      'Milk',
      'Shredded Cheddar cheese',
    ],
    steps: [
      'Cook Macaroni for 8',
      'Melt butter in a saucepan',
      'Add flour, salt, pepper and mix',
      'Add Milk and mix',
      'Cook until mix is smooth',
      'Add cheddar cheese',
      'Add the macaroni',
    ],
  },
  Tamagoyaki_Japanese_Omelette: {
    categories: ['Japanese', 'Vegetarian'],
    ingredients: ['Eggs', 'Soy sauce', 'Sugar', 'Salt', 'Olive oil'],
    steps: [
      'Beat the eggs',
      'Add soya sauce, sugar and salt',
      'Add oil to a sauce pan',
      'Bring to medium heat',
      'Add some mix to the sauce pan',
      "Let is cook for 1'",
      'Add oil to a sauce pan',
      'Add some mix to the sauce pan',
      "Let is cook for 1'",
      'Remove pan from fire',
    ],
  },
};

const executeQuery = async (query) => {
  try {
    await db.execute(query);
  } catch (err) {
    console.log(err);
  }
};

const setupDatabase = async () => {
  await executeQuery('DROP DATABASE IF EXISTS recipes_db');
  await executeQuery('CREATE DATABASE IF NOT EXISTS recipes_db');
  await db.end();
  db = mysql.createPool({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'recipes_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

const createTables = async () => {
  await executeQuery(
    'CREATE TABLE IF NOT EXISTS recipes (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL)'
  );

  await executeQuery(
    'CREATE TABLE IF NOT EXISTS categories (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,recipe_id INT,FOREIGN KEY (recipe_id) REFERENCES recipes(id))'
  );

  await executeQuery(
    'CREATE TABLE IF NOT EXISTS ingredients (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, recipe_id INT, FOREIGN KEY (recipe_id) REFERENCES recipes(id))'
  );

  await executeQuery(
    'CREATE TABLE IF NOT EXISTS steps (id INT AUTO_INCREMENT PRIMARY KEY,recipe_id INT,step_number INT,description TEXT,FOREIGN KEY (recipe_id) REFERENCES recipes(id))'
  );
};

const insertData = async () => {
  for (const recipe in recipes) {
    const recipeName = recipe;
    await executeQuery(`INSERT INTO recipes (name) VALUES ('${recipeName}')`);

    const recipeId = (
      await db.execute(`SELECT id FROM recipes WHERE name = '${recipeName}'`)
    )[0][0].id;

    for (const category of recipes[recipe].categories) {
      await executeQuery(
        `INSERT INTO categories (name, recipe_id) VALUES ('${category}', ${recipeId})`
      );
    }

    for (const ingredient of recipes[recipe].ingredients) {
      await executeQuery(
        `INSERT INTO ingredients (name, recipe_id) VALUES ('${ingredient}', ${recipeId})`
      );
    }

    for (let i = 0; i < recipes[recipe].steps.length; i++) {
      await executeQuery(
        `INSERT INTO steps (recipe_id, step_number, description) VALUES (${recipeId}, ${
          i + 1
        }, '${recipes[recipe].steps[i]}')`
      );
    }
  }
};

setupDatabase().then(createTables).then(insertData).catch(console.error);

export default app;
