const router = require('express').Router();
const { message } = require('../controllers');
const { isAuth } = require('../config/restrictedPages');

router.get('/add/:id', isAuth, message.get.add);
router.get('/all/:id', isAuth, message.get.all);

router.post('/add/:id', isAuth, message.post.add);

module.exports = router;