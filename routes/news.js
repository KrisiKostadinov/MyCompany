const router = require('express').Router();
const { news } = require('../controllers');
const { isAuth } = require('../config/restrictedPages');

router.get('/', isAuth, news.get.all);
router.get('/add', isAuth, news.get.add);
router.get('/details/:id', isAuth, news.get.details);
router.get('/edit/:id', isAuth, news.get.edit);
router.get('/delete/:id', isAuth, news.get.delete);

router.post('/add', isAuth, news.post.add);
router.post('/edit/:id', isAuth, news.post.edit);
router.delete('/delete/:id', isAuth, news.delete.byId);

module.exports = router;