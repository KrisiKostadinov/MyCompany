const Worker = require("../models/Worker");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configuration = require('../config/configuration');

module.exports = {
    get: {
        register(req, res) {
            res.render('worker/register');
        },

        login(req, res) {
            res.render('worker/login');
        },

        employees(req, res) {
            res.render('worker/employees');
        }
    },

    post: {
        async register(req, res) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            req.body.password = hash;

            try {
                await Worker.create({ ...req.body, companyId: req.params.companyId });
            } catch(err) {
                console.log(err);
            }

            res.redirect('/');
        },

        async login(req, res) {
            const worker = await Worker.findOne({ email: req.body.email });

            if(!worker) {
                return res.render('worker/login');
            }

            bcrypt.compare(req.body.password, worker.password, (err, isMatch) => {
                if (isMatch) {
                    jwt.sign({
                        worker: {
                            email: worker.email,
                            isCompany: false,
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