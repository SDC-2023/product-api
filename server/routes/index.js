const router = require('express').Router();
const controller = require('../controllers/products');

router.get('/:product_id/related', controller.getRelatedProductsById);
router.get('/:product_id/styles', controller.getProductStylesById);
router.get('/:product_id', controller.getProductById);
router.get('/', controller.getProducts);

module.exports = router;