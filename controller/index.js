module.exports = {
    showIndexPage: (req, res) => {
        res.render('index', { user: req.session.user, islogin: req.session.islogin })
    }
}