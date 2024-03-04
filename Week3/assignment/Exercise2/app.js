import executeQuery from './util/db.js';
import createTables from './transactions-create-tables.js';
import insertValues from './transactions-insert-values.js';
import transaction from './transaction.js';

async function main() {
  await executeQuery('DROP DATABASE IF EXISTS `test`');
  await executeQuery('CREATE DATABASE IF NOT EXISTS `test`');
  await executeQuery('USE `test`');
}

try {
  await main();
  await createTables();
  await insertValues();
  await transaction();
} catch (err) {
  console.error(err);
}
