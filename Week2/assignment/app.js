import express from 'express';

import { createDB, dropDB } from './db/setupDB.js';
import {
  addAuthorsTable,
  addMentorToAuthorsTable,
  addDataInAuthorTable,
  addMentorsDataInAuthorsTable,
} from './db/keys.js';

import {
  addResearchPapers,
  addDataInResearchPapersTable,
} from './db/relationships.js';

const app = express();

const setupDatabase = async () => {
  await dropDB();
  await createDB();
};

const createTables = async () => {
  await addAuthorsTable();
  await addMentorToAuthorsTable();
  await addResearchPapers();
};

const addData = async () => {
  await addDataInAuthorTable();
  await addMentorsDataInAuthorsTable();
  await addDataInResearchPapersTable();
};

setupDatabase()
  .then(() => createTables())
  .then(() => addData())
  .catch((err) => console.log(err));

export default app;
