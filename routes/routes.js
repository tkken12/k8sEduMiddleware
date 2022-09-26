const router = require("express").Router() 
const pod = require("./v1/pod/podRoute")

router.use("/pod", pod)

module.exports = router