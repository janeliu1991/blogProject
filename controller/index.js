const conn = require('../db/index')
module.exports = {
    //展示首页
    showIndexPage: (req, res) => {
        //如果页面带参数，获取当前页面参数，否则赋值为1
        let currentPage = Number(req.query.page) || 1
        let pageSize = 3
            //联表查询
        const sql = `select articles.id,articles.title,articles.ctime,users.nickname from articles left join users on articles.authorId = users.id order by articles.id desc limit ${(currentPage-1)*pageSize},${pageSize};select count(*) as count from articles`
        conn.query(sql, (err, result) => {
            if (err || result[0].length < 1) return res.render('index.ejs', {
                    user: req.session.user,
                    islogin: req.session.islogin,
                    article: []
                })
                // console.log(result[1][0].count);
                // console.log(result[0]);

            //获取总页数
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