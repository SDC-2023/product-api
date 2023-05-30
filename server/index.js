require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const router = require('./routes')

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(express.json());
app.use('/products', router);


app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Listening at http://localhost:${process.env.SERVER_PORT}`);
});

module.exports = app;