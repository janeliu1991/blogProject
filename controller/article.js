const dayjs = require("dayjs")
const conn = require('../db/index')
const marked = require("marked")
module.exports = {
    //展示添加文章页面
    showAddArticlePage: (req, res) => {
        //判断用户是否登录，如果没登录，重定向到登录页面
        if (!req.session.islogin) return res.redirect('/')
            //如果登录了将用户的登录信息传递过去，方便发表文章时获取用户的id即文章作者id，因为发表文章时post请求
        res.render("./article/add.ejs", {
            user: req.session.user,
            islogin: req.session.islogin
        })
    },
    //添加文章的接口
    addArticle: (req, res) => {
        //利用body-parser中间件。通过req.body获取提交的表单数据
        const body = req.body
            //获取发表文章的时间
        body.ctime = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const sql = "insert into articles set ?"
        conn.query(sql, body, (err, result) => {
            if (err) return res.send({ status: 502, msg: "添加文章失败" })
            if (result.affectedRows != 1) return res.send({ status: 502, msg: "添加文章失败" })
                //网数据库添加成功，返回状态和该文章的id值，前台ajax根据返回的result里面的id跳转到当前文章详细页面
            res.send({ status: 200, msg: "添加文章成功", insertId: result.insertId })
        })

    },
    //get请求 文章详情页展示
    showArticleDetail: (req, res) => {
        //根据URL里面传递的参数获取文章id
        const id = req.params.id;
        const sql = "select * from articles where id=?"
        conn.query(sql, id, (err, result) => {
            if (err) return res.send({ status: 500, msg: "获取文章失败" })
            if (result.length != 1) return res.redirect('/')
                //marked将marked的文本形式转化成html字符串的形式
            const html = marked(result[0].content)
            result[0].content = html
                //将获取到的相关id文章数据渲染到文章详情页面上
            res.render('./article/info.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                article: result[0]
            })

        })
    },
    //点击编辑按钮，跳转到编辑页面，冰盖该id的文章标题，内容渲染到编辑页面中
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
    //编辑完成提交保存按钮
    editArticle: (req, res) => {
        //获取提交过来的内容
        const body = req.body
            //将内容在数据库进行更新
        const sql = "update articles set ? where id = ?"
        conn.query(sql, [body, body.id], (err, result) => {
            if (err) return res.send({ status: 500, msg: "编辑文字失败" })
            if (result.affectedRows !== 1) return res.send({ status: 501, msg: "编辑文字失败" })
            res.send({ status: 200, msg: "编辑文章成功" })
        })

    },


}