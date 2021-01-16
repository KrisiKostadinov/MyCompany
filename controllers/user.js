module.exports = {
    get: {
        registerCompany(req, res) {
            res.render('user/register');
        },

        login(req, res) {
            res.render('user/login');
        }
    },

    post: {
        login(req, res) {
            
        },

        registerAsCompany(req, res) {

        }
    }
}