const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_app',
  password: '1234',
  port: 5432,
});

const username = 'admin';
const password = 'admin123';

const insertUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    console.log('New user inserted:', result.rows[0]);
  } catch (err) {
    console.error('Error inserting user:', err);
  } finally {
    pool.end();
  }
};

insertUser();
