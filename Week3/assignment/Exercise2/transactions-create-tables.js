import executeQuery from './util/db.js';

async function createTables() {
  await executeQuery(
    `CREATE TABLE IF NOT EXISTS account (
      account_number INT AUTO_INCREMENT PRIMARY KEY,
      balance DECIMAL(10, 2) NOT NULL
    )`
  );

  await executeQuery(
    `CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount DECIMAL(10, 2) NOT NULL,
      changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
    )`
  );
}

export default createTables;
