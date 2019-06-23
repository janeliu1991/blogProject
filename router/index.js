const express = require("express")
const router = express.Router()
const ctrl = require("../controller/index")
    //请求的地址为
router.get('/', ctrl.showIndexPage)

module.exports = router