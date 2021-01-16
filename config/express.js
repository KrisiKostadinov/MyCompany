const exphbs = require('express-handlebars');

module.exports = (express, port) => {
    const app = express();

    require('./db').then(() => {
        app.engine('.hbs', exphbs({
            extname: '.hbs',
            defaultLayout: 'base-layout',
        }));
        app.set('view engine', '.hbs');
    
        app.use('/', require('../routes/index'));
        app.use('/user', require('../routes/user'));
    
        app.listen(port, () => console.log('Server listening on port: ' + port));
    });
}