const router = require('express').Router();
const { user } = require('../controllers');

router.get('/registerAsCompany', user.get.registerCompany);
router.get('/login', user.get.login);

router.post('/registerAsCompany', user.post.registerAsCompany);
router.post('/login', user.post.login);

module.exports = router;