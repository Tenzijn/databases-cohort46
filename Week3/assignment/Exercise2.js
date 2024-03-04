/*
### 3.2. Exercise 2 : SQL Transactions

1. Create two tables `account` and `account_changes` (write transactions-create-tables.js file)
2. `account` table should have following fields : `account_number, balance`.
3. `account_changes` table should have the following
   fields : `change_number, account_number, amount, changed_date, remark`.
4. Choose the appropriate data types and keys for these tables.
5. Insert some sample data in these tables. (write transactions-insert-values.js file)
6. Transfer the amount of 1000 from account number 101 to account number 102 and log the changes in the
   table `account_changes`.
   Do this in a _single transaction_ (Write transaction.js file)

Submit all three files (`transactions-create-tables.js`, `transactions-insert-values.js` and `transaction.js`).

*/

// transactions-create-tables.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  const sql = `CREATE TABLE account (
    account_number INT PRIMARY KEY,
    balance INT
  )`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Table account created');
  });
  const sql2 = `CREATE TABLE account_changes (
    change_number INT PRIMARY KEY,
    account_number INT,
    amount INT,
    changed_date DATE,
    remark VARCHAR(255)
  )`;
  connection.query(sql2, (err, result) => {
    if (err) throw err;
    console.log('Table account_changes created');
  });
  connection.end();
});
