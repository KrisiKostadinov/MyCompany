const router = require('express').Router();
const { home } = require('../controllers');
const { isAuth } = require('../config/restrictedPages');

router.get('/', isAuth, home.get.home);

module.exports = router;