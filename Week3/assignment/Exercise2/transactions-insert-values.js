import executeQuery from './util/db.js';

async function insertValues() {
  await executeQuery(
    `INSERT INTO account (balance) VALUES (1000), (2000), (3000)`
  );
  await executeQuery(
    `INSERT INTO account_changes (account_number, amount, remark) VALUES (1, 1000, 'Initial balance'), (2, 2000, 'Initial balance'), (3, 3000, 'Initial balance')`
  );
}

export default insertValues;
