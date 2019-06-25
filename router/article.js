const express = require("express")
const router = express.Router()
const ctrl = require("../controller/article")
router.get('/article/add', ctrl.showAddArticlePage)
router.post('/article/add', ctrl.addArticle)
router.get('/article/info/:id', ctrl.showArticleDetail)
module.exports = router