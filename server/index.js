require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(morgan('start'));
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});