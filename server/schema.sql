-----------------------------------
----------DATABASE SCHEMA----------
-----------------------------------


-------------------
---Product Table---
-------------------
DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE IF NOT EXISTS product (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_price VARCHAR(100) NOT NULL
);


--------------------
---Features Table---
--------------------
DROP TABLE IF EXISTS features CASCADE;

CREATE TABLE IF NOT EXISTS features (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES product(id),
  feature VARCHAR(100) NOT NULL,
  value VARCHAR(100) NOT NULL
);


-------------------
----Style Table----
-------------------
DROP TABLE IF EXISTS styles CASCADE;

CREATE TABLE IF NOT EXISTS styles (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES product(id),
  name VARCHAR(100) NOT NULL,
  sale_price VARCHAR(100),
  original_price VARCHAR(100) NOT NULL,
  default_style BOOLEAN NOT NULL
);


-------------------
---Related Table---
-------------------
DROP TABLE IF EXISTS related CASCADE;

CREATE TABLE IF NOT EXISTS related (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  current_product_id INT NOT NULL REFERENCES product(id),
  related_product_id INT NOT NULL
);


--------------------
-----Skus Table-----
--------------------
DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE IF NOT EXISTS skus (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  style_id INT NOT NULL REFERENCES styles(id),
  size VARCHAR(10) NOT NULL,
  quantity INT NOT NULL
);


--------------------
----Photos Table----
--------------------
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE IF NOT EXISTS photos (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  style_id INT NOT NULL REFERENCES styles(id),
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);



------------------------------------------
------------- COPY COMMANDS --------------
------------------------------------------

-- COPY product(id, name, slogan, description, category,default_price)
-- FROM '/Users/benpak/Downloads/product.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY styles (id, product_id, name, sale_price, original_price, default_style)
-- FROM '/Users/benpak/Downloads/styles.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY features(id, product_id, feature, value)
-- FROM '/Users/benpak/Downloads/features.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY related(id, current_product_id, related_product_id)
-- FROM '/Users/benpak/Downloads/related.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY photos(id, style_id, url, thumbnail_url)
-- FROM '/Users/benpak/Downloads/photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY skus(id, style_id, size, quantity)
-- FROM '/Users/benpak/Downloads/skus.csv'
-- DELIMITER ','
-- CSV HEADER;


