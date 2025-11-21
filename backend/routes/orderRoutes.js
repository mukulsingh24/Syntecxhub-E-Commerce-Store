const express = require('express')
const router = express.Router();

const{
    AddOrderItems,
    getAllOrders
} = require('../controller/orderController')

router.route('/order').post(AddOrderItems);
router.route('/orders/all').get(getAllOrders);

module.exports = router;