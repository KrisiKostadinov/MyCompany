const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const CompanySchema = new Schema({
    email: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
    },

    name: {
        type: String,
    }
});

const Company = model('Company', CompanySchema);

module.exports = Company;