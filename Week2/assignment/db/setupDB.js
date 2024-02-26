import mysql from 'mysql2/promise';

import queryExecution from '../util/queryExecution.js';

export let db = await mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

export const dropDB = async () => {
  const query = `DROP DATABASE IF EXISTS db_assignment;`;
  await queryExecution(query);
};
export const createDB = async () => {
  const query = `CREATE DATABASE IF NOT EXISTS db_assignment;`;
  await queryExecution(query);
  db.end();
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'db_assignment',
  });
};
