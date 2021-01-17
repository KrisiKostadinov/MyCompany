const router = require('express').Router();
const { worker } = require('../controllers');
const { isAuth } = require('../config/restrictedPages');

router.get('/register/:companyId', isAuth, worker.get.register);
router.get('/login', worker.get.login);
router.get('/employees/:companyId', isAuth, worker.get.employees);

router.post('/register/:companyId', isAuth, worker.post.register);
router.post('/employees/:companyId', isAuth, worker.get.employees);
router.post('/login', worker.post.login);

module.exports = router;