const conn = require('../db/index')
module.exports = {
    showIndexPage: (req, res) => {
        let currentPage = Number(req.query.page) || 1
        let pageSize = 3
        const sql = `select articles.id,articles.title,articles.ctime,users.nickname from articles left join users on articles.authorId = users.id order by articles.id desc limit ${(currentPage-1)*pageSize},${pageSize};select count(*) as count from articles`
        conn.query(sql, (err, result) => {
            if (err || result[0].length < 1) return res.render('index.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                article: []
            })
            console.log(result[1][0].count);
            console.log(result[0]);
            let pageCount = Math.ceil(result[1][0].count / pageSize)
            res.render('index', {
                user: req.session.user,
                islogin: req.session.islogin,
                article: result[0],
                pageCount: pageCount,
                currentPage: currentPage
            })
        })

    }
}