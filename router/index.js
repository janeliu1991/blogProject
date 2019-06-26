const express = require("express")
const router = express.Router()
const ctrl = require("../controller/index")
    //展示首页
router.get('/', ctrl.showIndexPage)

module.exports = router