const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configuration = require('../config/configuration');

module.exports = {
    get: {
        register(req, res) {
            res.render('company/register');
        },

        login(req, res) {
            res.render('company/login');
        },

        administration(req, res) {
            res.render('company/administration');
        }
    },

    post: {
        async register(req, res) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            req.body.password = hash;

            try {
                await Company.create({ ...req.body });
            } catch(err) {
                console.log(err);
            }

            res.redirect('/');
        },

        async login(req, res) {
            const company = await Company.findOne({ email: req.body.email });

            if(!company) {
                return res.render('company/login');
            }

            bcrypt.compare(req.body.password, company.password, (err, isMatch) => {
                if (isMatch) {
                    jwt.sign({
                        company: {
                            name: company.name,
                            email: company.email,
                            companyId: company._id,
                            isCompany: true,
                        },
                    }, configuration.SECRET, (err, token) => {
                        res.cookie('token', token);
                        res.redirect('/');
                    });
                }
            });
        }
    }
}