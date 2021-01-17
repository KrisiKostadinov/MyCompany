const mongosse = require('mongoose');
const config = require('./configuration');

const url = config.URL;
const port = config.PORT;

module.exports = mongosse.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, console.log('Server running on: ', port));