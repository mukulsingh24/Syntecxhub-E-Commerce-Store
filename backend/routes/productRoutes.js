const express = require('express')
const router = express.Router();

const{
    createProduct,
    getProduct
} = require('../controller/productController')

router.route('/products').get(getProduct).post(createProduct)
module.exports = router;