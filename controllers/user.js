module.exports = {
    get: {
        logout(req, res) {
            res.clearCookie('token');
            res.redirect('/');
        }
    }
}