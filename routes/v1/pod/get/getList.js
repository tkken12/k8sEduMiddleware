const { RequestHandler, GetMethodQueryParser, SendResponse } = require("../../../../common/util")
const { Constants } = require("../../../../common/const")
const router = require("express").Router()

router.get( "/", async(req, res) => {

    let message
    let code
    
    RequestHandler({
        "method" : Constants["REQUEST_PATH"]["METHOD"]["GET"],
        "reqPath": Constants["REQUEST_PATH"]["BROKER_PATH"]["API"]["V1"]["POD"]["GET"],
        "query"  : { params: { command: "GET", type: "ALL", params: GetMethodQueryParser( { podName: "", podNamespaces: []}) } }
    }).then( brokerRes => {
        message = brokerRes["data"]
        code    = Constants["HTTP_STATUS_CODE"][200]
    }).catch(err => { 
        message = []
        code = Constants["HTTP_STATUS_CODE"][401]
    }).finally( () => {
        SendResponse(res, { code: code, message: !!message["Message"] !== false ? message["Message"] : "" }) 
    })
})

module.exports = router