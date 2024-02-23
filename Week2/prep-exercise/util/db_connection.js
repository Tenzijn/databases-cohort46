//db connection pool
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

export default pool.promise();
