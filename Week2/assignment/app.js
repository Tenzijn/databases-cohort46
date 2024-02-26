import express from 'express';

import { createDB, dropDB } from './db/setupDB.js';
const app = express();

const setupDatabase = async () => {
  await dropDB();
  await createDB();
};

const createTables = async () => {};

setupDatabase()
  .then(() => createTables())
  .catch((err) => console.log(err));

export default app;
