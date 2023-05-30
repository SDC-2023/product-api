const { pool } = require('../db');

module.exports = {
  getProducts: (req, res) => {
    const count = req.query.count || 5;
    const page = req.query.page || 0;
    const products = `SELECT * FROM product ORDER BY id LIMIT ${count} OFFSET ${page}`;
    pool.query(products)
      .then((results) => res.status(200).json(results.rows))
      .catch((err) => {
        console.error('There was an error retrieving products data', err);
        res.sendStatus(500);
      });
  },

  getProductById: (req, res) => {
    const productId = req.params.product_id;
    const targetProduct = `
      SELECT
        p.id, p.name, p.slogan, p.description, p.category, p.default_price,
        json_agg(json_build_object('feature', f.feature, 'value', f.value))
      AS features
      FROM product p
      JOIN features f ON p.id = f.product_id
      WHERE p.id = ${productId}
      GROUP BY p.id;`;
    pool.query(targetProduct)
      .then((result) => res.status(200).json(result.rows[0]))
      .catch((err) => {
        console.error('There was a problem retrieving the product by id! ', err);
        res.sendStatus(500);
      });
  },

  getProductStylesById: (req, res) => {
    const productId = req.params.product_id;
    const targetProduct = `
    SELECT
      styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS "default?",
      (SELECT json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url))
        FROM
          (SELECT DISTINCT ON (photos.thumbnail_url, photos.url)
            photos.thumbnail_url,
            photos.url
            FROM photos
            WHERE photos.style_id = styles.id) p
      ) AS photos,
      (SELECT json_object_agg(s.id, json_build_object('quantity', s.quantity, 'size', s.size))
        FROM
          (SELECT DISTINCT ON (skus.id)
            skus.id,
            skus.quantity,
            skus.size
            FROM skus
            WHERE skus.style_id = styles.id) s
      ) AS skus
    FROM styles
    WHERE styles.product_id = ${[productId]}`;
    pool.query(targetProduct)
      .then((result) => res.status(200).json({ product_id: productId, results: result.rows}))
      .catch((err) => {
        console.error('There was a problem retrieving product styles! ', err);
        res.sendStatus(500);
      });
  },

  getRelatedProductsById: (req, res) => {
    const productId = req.params.product_id;
    const targetProduct = `SELECT related_product_id FROM related WHERE current_product_id = ${productId} ORDER BY related_product_id`;
    pool.query(targetProduct)
      .then((result) => {
        const relatedIds = result.rows.map((relatedId) => relatedId.related_product_id);
        res.status(200).json(relatedIds);
      })
      .catch((err) => {
        console.error('There was a problem retrieving related products! ', err);
        res.sendStatus(500);
      });
  }
}