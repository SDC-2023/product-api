// INITIALIZE file to run ETL process through NODE

require('dotenv').config();
const { Pool } = require('pg');
const { from as copyFrom } = require('pg-copy-streams')
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.PORT,
})

const readAndWrite = (copyCMD, fileRoute) => {
  pool.connect()
    .then((client) => {
      let stream = client.query(copyFrom(copyCMD));
      let fileStream = fs.createReadStream(fileRoute);
      fileStream.on('error', (err) => console.error(err));
      stream.on('error'. (err) => console.error(err));
      stream.on('finish', console.log('File transfer to DB complete!'));
      fileStream.pipe(stream);
      return client;
    })
    .catch((err) => console.err('There was a problem transferring the file to the DB', err))
    .then((client) => client.release())
}

const setUpDB = async (pool) => {
  try {
    const client = await pool.connect();

    await client.query('DROP TABLE IF EXISTS product, features, style, related, skus, photos CASCADE');

    await client.query(
      "CREATE TABLE IF NOT EXISTS product (\
        id INT UNIQUE NOT NULL PRIMARY KEY,\
        name VARCHAR(100) NOT NULL,\
        slogan TEXT NOT NULL,\
        description TEXT NOT NULL,\
        category VARCHAR(100) NOT NULL,\
        default_price VARCHAR(100) NOT NULL\
      );\
      CREATE TABLE IF NOT EXISTS features (\
        id INT UNIQUE NOT NULL PRIMARY KEY,\
        product_id INT NOT NULL REFERENCES product(id),\
        feature VARCHAR(100) NOT NULL,\
        value VARCHAR(100) NOT NULL\
      );\
      CREATE TABLE IF NOT EXISTS style (\
        id INT UNIQUE NOT NULL PRIMARY KEY,\
        product_id INT NOT NULL REFERENCES product(id),\
        name VARCHAR(100) NOT NULL,\
        sale_price VARCHAR(100),\
        original_price VARCHAR(100) NOT NULL,\
        default_style BOOLEAN NOT NULL\
      );\
      CREATE TABLE IF NOT EXISTS related (\
        id INT UNIQUE NOT NULL PRIMARY KEY,\
        current_product_id INT NOT NULL REFERENCES product(id),\
        related_product_id INT NOT NULL\
      );\
      CREATE TABLE IF NOT EXISTS skus (\
        id INT UNIQUE NOT NULL PRIMARY KEY,\
        style_id INT NOT NULL REFERENCES style(id),\
        size VARCHAR(10) NOT NULL,\
        quantity INT NOT NULL\
      );\
      CREATE TABLE IF NOT EXISTS photos (\
        id INT UNIQUE NOT NULL PRIMARY KEY,\
        style_id INT NOT NULL REFERENCES style(id),\
        url TEXT NOT NULL,\
        thumbnail_url TEXT NOT NULL\
      );"
    )

    await readAndWrite('COPY product(id, name, slogan, description, category,default_price) FROM STDIN CSV HEADER', '/Users/benpak/Downloads/product.csv');
    await readAndWrite('COPY style (id, product_id, name, sale_price, original_price, default_style) FROM STDIN CSV HEADER', '/Users/benpak/Downloads/style.csv');
    await readAndWrite('COPY features(id, product_id, feature, value) FROM STDIN CSV HEADER', '/Users/benpak/Downloads/features.csv');
    await readAndWrite('COPY photos(id, style_id, url, thumbnail_url) FROM STDIN CSV HEADER', '/Users/benpak/Downloads/photos.csv');
    await readAndWrite('COPY skus(id, style_id, size, quantity) FROM STDIN CSV HEADER', '/Users/benpak/Downloads/skus.csv');
    await readAndWrite('COPY related(id, current_product_id, related_product_id) FROM STDIN CSV HEADER', '/Users/benpak/Downloads/related.csv');
  } catch(err) {
    console.error('ERROR', err);
  }
}

