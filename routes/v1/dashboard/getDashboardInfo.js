const { SendResponse, RequestHandler } = require("../../../common/util")
const { Constants } = require("../../../common/const")

const router = require("express").Router() 

router.use("/", (req, res) => {

    let message
    let code

    RequestHandler({ "method": Constants["REQUEST_PATH"]["METHOD"]["GET"], 
                     "reqPath": Constants["REQUEST_PATH"]["BROKER_PATH"]["API"]["V1"]["DASHBOARD"]["GET"] ,
                     "query": ""
    }).then( brokerRes => {
        message = brokerRes["data"]
        code    = Constants["HTTP_STATUS_CODE"][200] 
    }).catch( err => {
        message = []
        code    = Constants["HTTP_STATUS_CODE"][401]  
    }).finally( () => {
        SendResponse(res, { code: code, message: !!message["Message"] !== false ? message["Message"] : ""  }) 
    })
})

module.exports = router