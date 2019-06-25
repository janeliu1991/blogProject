const express = require('express')
const app = express()
const fs = require("fs")
const path = require("path")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))

const session = require('express-session')
    //将session挂载到服务器上，那么只要发送了请求，req上都会有req.session属性
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')

//托管静态资源文件
app.use('/node_modules', express.static('node_modules'))

// //index路由模块
// const router1 = require("./router/index")
// app.use(router1)

// //用户路由模块
// const router2 = require("./router/user")
// app.use(router2)

fs.readdir(path.join(__dirname, "./router"), (err, filenames) => {
    if (err) return console.log("读取router中的文件失败");
    filenames.forEach(fname => {
        const router = require(path.join(__dirname, "./router", fname))
        app.use(router)
    })

})

app.listen(3000, () => {
    console.log("服务器运行成功……")
})