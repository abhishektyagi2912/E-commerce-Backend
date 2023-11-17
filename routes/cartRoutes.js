const router = require('express').Router();
const cartControllers = require('../controllers/cartControllers');

router.get('/fetch',cartControllers.fetchCart);
router.post('/add',cartControllers.addCart);
router.delete('/delete/:cartItem',cartControllers.deleteCart);
router.put('/update/:cartItem',cartControllers.updateCart);

module.exports = router;
