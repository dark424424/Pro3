var express = require('express')
var router = express.Router()
var authRouter = require("./auth")
var userRouter = require("./user")
var jobRouter = require("./job")
var companyRouter = require("./company")
var roleRouter = require("./role")
var applicationRouter = require("./application")
var searchRouter = require("./search")


router.use("/auth",authRouter);
router.use("/job",jobRouter);
router.use("/user",userRouter);
router.use("/company", companyRouter);
router.use('/role', roleRouter)
router.use('/application', applicationRouter)
router.use('/search', searchRouter)


module.exports = router;