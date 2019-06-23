const express = require("express")
    //创建路由对象
const router = express.Router()

const ctrl = require('../controller/user')

//登录页面
router.get('/login', ctrl.userLogin)

//注册页面
router.get('/register', ctrl.userRegister)

//注册接口
router.post('/register', ctrl.registerAPI)

//登录接口
router.post('/login', ctrl.loginAPI)


module.exports = router