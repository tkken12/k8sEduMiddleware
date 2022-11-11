const router = require("express").Router()
const createPod = require("./create/createPod")
const getPodList = require("./get/getList")

router.use("/creation", createPod)
router.use("/list", getPodList )
// router.use("/deletion", )
// router.use("/edit", )

module.exports = router