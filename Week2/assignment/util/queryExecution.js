import { db } from '../db/setupDB.js';

const queryExecution = async (query) => {
  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

export default queryExecution;
