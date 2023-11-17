const router = require('express').Router();
const ordersControllers = require('../controllers/orderControllers');

router.get('/',ordersControllers.getUserOrders);

module.exports = router;
