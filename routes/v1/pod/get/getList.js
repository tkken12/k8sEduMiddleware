const { ReqeustHandler, GetMethodQueryParser } = require("../../../../common/util")
const { Constants } = require("../../../../common/const")
const router = require("express").Router()

router.get( "/", async(req, res) => {

    ReqeustHandler({
        "method" : Constants["REQUEST_PATH"]["METHOD"]["GET"],
        "reqPath": Constants["REQUEST_PATH"]["BROKER_PATH"]["API"]["V1"]["POD"]["GET"],
        "query"  : { params: { command: "GET", type: "ALL", params: GetMethodQueryParser( { podName: "ab", podNamespaces: ["a","b"]}) } }
    }).then( brokerRes => {  res.send(brokerRes["data"]) })
    .catch(err => { console.log(err) })
    })

module.exports = router