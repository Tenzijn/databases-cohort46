// 1. Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and ( fetch all the records in the database)

let name = "anyname' OR '1'='1";
let code = "anycode' OR '1'='1";

// above values will fetch all the records in the database

// 2. Rewrite the function so that it is no longer vulnerable to SQL injection
function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ?? WHERE Name = ? and code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result[0].name);
    }
  );
}
