const router = require('express').Router();
const { company } = require('../controllers');
const { isAuth } = require('../config/restrictedPages');

router.get('/register', company.get.register);
router.get('/login', company.get.login);

router.post('/register', company.post.register);
router.post('/login', company.post.login);

module.exports = router;