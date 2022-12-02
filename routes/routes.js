const router = require("express").Router() 
const dashboard = require("./v1/dashboard/getDashboardInfo")
const pod = require("./v1/pod/podRoute")

router.use("/pod", pod)
router.use("/dashboard", dashboard)

module.exports = router