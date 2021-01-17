const Worker = require("../models/Worker");

module.exports = {
    get: {
        async home(req, res) {
            if (req.data) {
                const workers = await Worker.find({ companyId: req.data.companyId }).lean();
                console.log(workers);
                res.render('home', { workers });
            }
            
            res.render('home', { workers: [] });
        }
    }
}