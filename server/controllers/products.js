const client = require('../db');

module.exports = {
  getProducts: (req, res) => {
    const products = "SELECT * FROM product ORDER BY id LIMIT 5";
    client.query(products)
      .then((results) => res.status(200).json(results.rows))
      .catch((err) => {
        console.error('There was an error retrieving products data', err);
        res.sendStatus(500);
      });
  },

  getProductById: (req, res) => {
    const productId = req.params.product_id;
    const targetProduct = `SELECT *, (SELECT json_agg(nested_features) FROM (SELECT features.feature, features.value FROM features WHERE features.product_id = ${productId}) AS nested_features) AS features FROM product WHERE id = ${productId}`;
    client.query(targetProduct)
      .then((result) => res.status(200).json(result.rows[0]))
      .catch((err) => {
        console.error('There was a problem retrieving the product by id! ', err);
        res.sendStatus(500);
      });
  },

  getProductStylesById: (req, res) => {
    const productId = req.params.product_id;
    const targetProduct = `SELECT styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS "default?", (SELECT json_agg(nested_photos) FROM (SELECT photos.thumbnail_url, photos.url FROM photos WHERE photos.style_id = styles.id) AS nested_photos) AS photos, (SELECT json_object_agg(nested_skus.id, nested_skus) FROM (SELECT skus.id, skus.quantity, skus.size FROM skus WHERE skus.style_id = styles.id) AS nested_skus) AS skus FROM styles WHERE styles.product_id = ${productId}`;
    client.query(targetProduct)
      .then((result) => res.status(200).json({ product_id: productId, results: result.rows}))
      .catch((err) => {
        console.error('There was a problem retrieving product styles! ', err);
        res.sendStatus(500);
      });
  },

  getRelatedProductsById: (req, res) => {
    const productId = req.params.product_id;
    const targetProduct = `SELECT related_product_id FROM related WHERE current_product_id = ${productId} ORDER BY related_product_id`;
    client.query(targetProduct)
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