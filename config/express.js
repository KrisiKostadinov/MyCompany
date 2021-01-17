const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (express, port) => {
    const app = express();

    require('./db').then(() => {
        app.engine('.hbs', exphbs({
            extname: '.hbs',
            defaultLayout: 'base-layout',
        }));
        app.set('view engine', '.hbs');

        app.use(cookieParser());
        app.use(express.json());
        app.use(bodyParser.urlencoded({
            extended: true,
        }));

        app.use('/', require('../routes/index'));
        app.use('/user', require('../routes/user'));
        app.use('/company', require('../routes/company'));
        app.use('/worker', require('../routes/worker'));

        app.listen(port, () => console.log('Server listening on port: ' + port));
    });
}