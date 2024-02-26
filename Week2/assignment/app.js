import express from 'express';

import { createDB, dropDB } from './db/setupDB.js';

import {
  addAuthorsTable,
  addMentorToAuthorsTable,
  addDataInAuthorTable,
  addMentorsDataInAuthorsTable,
} from './db/authors.js';

import {
  addResearchPapers,
  addDataInResearchPapersTable,
} from './db/researchPapers.js';

import {
  authorsAndMentors,
  authorsAndPublications,
  authorsAndPublicationsCount,
  researchPapersCountByFemaleAuthors,
  avgHIndexByUniversity,
  totalResearchPapersByUniversity,
  minAndMaxHIndexByUniversity,
} from './db/queries.js';

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

const queries = async () => {
  await authorsAndMentors();
  await authorsAndPublications();
  await authorsAndPublicationsCount();
  await researchPapersCountByFemaleAuthors();
  await avgHIndexByUniversity();
  await totalResearchPapersByUniversity();
  await minAndMaxHIndexByUniversity();
};

setupDatabase()
  .then(() => createTables())
  .then(() => addData())
  .then(() => queries())
  .catch((err) => console.log(err));

export default app;
