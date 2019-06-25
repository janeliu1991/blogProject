const dayjs = require("dayjs")
const conn = require('../db/index')
module.exports = {
    showAddArticlePage: (req, res) => {
        if (!req.session.islogin) return res.redirect('/')
        res.render("./article/add.ejs", {
            user: req.session.user,
            islogin: req.session.islogin
        })
    },
    addArticle: (req, res) => {
        const body = req.body
        body.ctime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const sql = "insert into articles set ?"
        conn.query(sql, body, (err, result) => {
            if (err) return res.send({ status: 502, msg: "添加文章失败" })
            if (result.affectedRows != 1) return res.send({ status: 502, msg: "添加文章失败" })
            console.log(result);

            res.send({ status: 200, msg: "添加文章成功", insertId: result.insertId })
        })

    },
    showArticleDetail: (req, res) => {
        //获取文章id
        const id = req.params.id;
        // console.log(id);

        const sql = "select * from articles where id=?"
        conn.query(sql, id, (err, result) => {
            if (err) return res.send({ status: 500, msg: "获取文章失败" })
            if (result.length != 1) return res.redirect('/')

            res.render('./article/info.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                article: result[0]
            })

        })
    }
}