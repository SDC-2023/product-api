require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 20,
});
// pool.connect()
//   .then(() => console.log('Successfully connected to the database!'))
//   .catch((err) => console.error('Unable to connect to the database', err));

const closePool = () => {
  pool.end();
};

module.exports.pool = pool;
module.exports.closePool = closePool;