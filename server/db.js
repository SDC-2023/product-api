require('dotenv').config();
const { Client } = require('pg');

const client = new Client(process.env.DB_ENDPOINT);
client.connect()
  .then(() => console.log('Successfully connected to the database!'))
  .catch((err) => console.error('Unable to connect to the database', err));

module.exports = client;