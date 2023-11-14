const router = require('express').Router();
const { getAllProducts, getProduct, searchProduct, createProduct } = require('../controllers/productControler');


router.get('/',getAllProducts);
router.get('/:id',getProduct);
router.get('/search/:key',searchProduct);
router.post('/',createProduct);

module.exports = router;
