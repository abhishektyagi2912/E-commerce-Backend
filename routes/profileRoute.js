const router = require('express').Router();
const profile = require('../controllers/profileContoller');

router.get('/',profile.getUser);
router.delete('/',profile.delete);

module.exports = router;
