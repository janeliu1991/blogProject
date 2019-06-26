const dayjs = require("dayjs")
const conn = require('../db/index')
const marked = require("marked")
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
            res.send({ status: 200, msg: "添加文章成功", insertId: result.insertId })
        })

    },
    showArticleDetail: (req, res) => {
        //获取文章id
        const id = req.params.id;
        const sql = "select * from articles where id=?"
        conn.query(sql, id, (err, result) => {
            if (err) return res.send({ status: 500, msg: "获取文章失败" })
            if (result.length != 1) return res.redirect('/')
            const html = marked(result[0].content)
            result[0].content = html
            res.render('./article/info.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                article: result[0]
            })

        })
    },
    showEditPage: (req, res) => {
        let id = req.params.id
        if (!req.session.islogin) return res.redirect('/')
        const sql = "select * from articles where id = ?"
        conn.query(sql, id, (err, result) => {
            if (err) return res.redirect('/')
            if (result.length !== 1) res.redirect('/')
            res.render('./article/edit.ejs', {
                user: req.session.user,
                article: result[0],
                islogin: req.session.islogin
            })
        })

    },

    editArticle: (req, res) => {
        const body = req.body
            // console.log(body.id);
        const sql = "update articles set ? where id = ?"
        conn.query(sql, [body, body.id], (err, result) => {
            if (err) return res.send({ status: 500, msg: "编辑文字失败" })
            if (result.affectedRows !== 1) return res.send({ status: 501, msg: "编辑文字失败" })
            res.send({ status: 200, msg: "编辑文章成功" })
        })

    },


}