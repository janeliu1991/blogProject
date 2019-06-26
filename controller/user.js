//引入dayjs时间模块
const dayjs = require("dayjs")

//引入数据库模块
const conn = require('../db/index')

module.exports = {
    //点击登录 ，通过get请求跳转登录页面
    userLogin: (req, res) => {
        res.render('./user/login', {})
    },
    //点击注册 ，通过get请求跳转注册页面
    userRegister: (req, res) => {
        res.render('./user/register', {})
    },
    //注册验证
    registerAPI: (req, res) => {
        //获取注册表单信息
        let body = req.body
            //进行表单信息的验证
        if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
            return res.send({ status: 501, msg: '请填写完整的用户信息' })
        }
        //用户名查重
        const sql1 = "select count(*) as count from users where username = ?"
        conn.query(sql1, body.username, (err, result) => {
            if (err) return res.send({ status: 502, msg: "查询用户失败" })
            if (result[0].count !== 0) return res.send({ status: 5003, msg: "请更换其他同用户名注册" })
            body.ctime = dayjs().format('YYYY-MM-DD HH:MM:SS')
                //用户名不重复，将新增用户信息添加到数据库
            const sql2 = "insert into users set ?"
            conn.query(sql2, body, (err, result) => {
                if (err) return res.send({ status: 504, msg: "新注册用户失败，请稍后重试" })
                if (result.affectedRows != 1) return res.send({ status: 505, msg: "新用户注册失败" })
                res.send({ status: 200, msg: "ok" })
            })

        })
    },
    //登录验证
    loginAPI: (req, res) => {
        let body = req.body
        const sql1 = "select * from users where username = ? and password = ?"
        conn.query(sql1, [body.username, body.password], (err, result) => {
            if (err) return res.send({ status: 501, msg: "登录失败" })
            if (result.length !== 1) return res.send({ status: 502, msg: "用户名或密码错误" })
                //登陆成功，将用户信息和登录状态存储到session中
            req.session.user = result[0]
            req.session.islogin = true

            res.send({ status: 200, msg: "ok" })

        })

    },

    loginOut: (req, res) => {
        req.session.destroy(function(err) {
            res.redirect('/')
        })

    }


}