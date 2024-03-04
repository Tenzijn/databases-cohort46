import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function executeQuery(query) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(query);
    return rows;
  } finally {
    conn.release();
  }
}

export default executeQuery;
