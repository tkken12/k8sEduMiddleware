const { SendResponse } = require("../../../common/util")

const router = require("express").Router() 

router.use("/", (req, res) => {

    SendResponse(res, { code: 200, message: "debug" })
})

module.exports = router