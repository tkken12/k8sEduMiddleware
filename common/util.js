const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config();


let axiosInstance = axios.create({
    baseURL: `${process.env["BROKER_PROTOCOL"]}://${process.env["BROKER_IP_ADDR"]}:${process.env["BROKER_PORT"]}`,
    timeout: process.env["BROKER_REQ_TIMEOUT"],
    keepAlive: true,
    headers: {
                "Content-Type": "application/x-www-form-urlencoded",
             }
})

const ReqeustHandler = ( props ) => {
    return new Promise( (resolve, reject) => { 
        axiosInstance[props.method](props.reqPath, props.query)
        .then ( res => resolve(res) )
        .catch( err => reject(err)  )
    })
}

const GetMethodQueryParser = ( query ) => { return JSON.stringify(query) }

module.exports = {
    ReqeustHandler,
    GetMethodQueryParser
}