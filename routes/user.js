const router = require('express').Router();
const { user } = require('../controllers');

router.get('/logout', user.get.logout);

module.exports = router;