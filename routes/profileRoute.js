const router = require('express').Router();
const profile = require('../controllers/profileContoller');
const auth = require('../middlewares/auth');

router.get('/', auth ,profile.getUser);
router.delete('/',auth,profile.delete);

module.exports = router;
