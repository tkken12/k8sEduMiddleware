const router = require("express").Router()
const createPod = require("./create/createPod")

router.use("/creation", createPod)

module.exports = router