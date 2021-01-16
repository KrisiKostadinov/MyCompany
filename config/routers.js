const indexRouter = require('../routes/index');
const userRouter = require('../routes/user');

module.exports = (app) => {
    app.use('/', indexRouter);
    app.use('/user', userRouter);
}