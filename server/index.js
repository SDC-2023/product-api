require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(morgan('start'));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});