import executeQuery from './util/db.js';

async function transaction() {
  const queries = [
    `START TRANSACTION;`,
    `SAVEPOINT start;`,
    `UPDATE account SET balance = balance - 1000 WHERE account_number = 1;`,
    `INSERT INTO account_changes (account_number, amount, remark) VALUES (1, -1000, 'Transfer to account 2');`,
    `UPDATE account SET balance = balance + 1000 WHERE account_number = 2;`,
    `INSERT INTO account_changes (account_number, amount, remark) VALUES (2, 1000, 'Transfer from account 1');`,
    `RELEASE SAVEPOINT start;`,
  ];

  try {
    for (const query of queries) {
      await executeQuery(query);
    }
  } catch (error) {
    console.error(error);
    await executeQuery(`ROLLBACK TO SAVEPOINT start;`);
  } finally {
    await executeQuery(`COMMIT;`);
  }
}

export default transaction;
