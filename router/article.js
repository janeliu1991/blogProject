const express = require("express")
const router = express.Router()
const ctrl = require("../controller/article")
    //展示添加文章的页面
router.get('/article/add', ctrl.showAddArticlePage)

//添加文章接口
router.post('/article/add', ctrl.addArticle)

//展示文章详情页面
router.get('/article/info/:id', ctrl.showArticleDetail)

//展示编辑页面
router.get('/article/edit/:id', ctrl.showEditPage)

//完成编辑操作接口
router.post('/article/edit', ctrl.editArticle)


module.exports = router