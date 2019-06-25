module.exports = {
    showIndexPage: (req, res) => {
        console.log(req.session.islogin);

        res.render('index', { user: req.session.user, islogin: req.session.islogin })
    }
}