const express = require("express")
const router = express.Router()
const ctrl = require("../controller/article")
router.get('/article/add', ctrl.showAddArticlePage)
router.post('/article/add', ctrl.addArticle)
router.get('/article/info/:id', ctrl.showArticleDetail)
router.get('/article/edit/:id', ctrl.showEditPage)
router.post('/article/edit', ctrl.editArticle)
module.exports = router