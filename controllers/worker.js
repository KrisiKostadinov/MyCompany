const Worker = require("../models/Worker");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configuration = require('../config/configuration');
const { worker } = require(".");

module.exports = {
    get: {
        register(req, res) {
            res.render('worker/register');
        },

        login(req, res) {
            res.render('worker/login');
        },

        async employees(req, res) {
            let employees = await Worker.find({ companyId: req.data.companyId }).lean();
            let display = employees;
            const text = req.body.search;
            if(text) {
                const filtered = display.filter(
                    x => x.firstName.startsWith(text) ||
                    x.sirName.startsWith(text) ||
                    x.lastName.startsWith(text) ||
                    x.position.startsWith(text) ||
                    x.phone.startsWith(text) ||
                    x.email.startsWith(text)
                    );
                display = filtered;
            } else {
                display = employees;
            }

            console.log(display);
            
            res.render('worker/employees', { employees: display });
        }
    },

    post: {
        async register(req, res) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            req.body.password = hash;

            try {
                const worker = await Worker.create({ ...req.body, companyId: req.params.companyId });
                res.redirect('/worker/employees/' + worker._id);
            } catch(err) {
                console.log(err);
            }
        },

        async login(req, res) {
            const worker = await Worker.findOne({ email: req.body.email }).populate('companyId');

            if(!worker) {
                return res.render('worker/login');
            }

            bcrypt.compare(req.body.password, worker.password, (err, isMatch) => {
                if (isMatch) {
                    jwt.sign({
                        worker: {
                            email: worker.email,
                            isCompany: false,
                            name: worker.companyId.name,
                            companyId: worker.companyId._id,
                            _id: worker._id,
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