const express = require("express")
const app = express()
const config = require("./config.json") 
const fs = require("fs")
const bodyParser = require("body-parser")
const { constants } = require("./common/const")
const routes = require("./routes/routes")
const morgan = require("morgan")
const { Logger, Stream } = require("./logger/loggerConfig")

require("dotenv").config()

const init = () => { 

    app.use( bodyParser.urlencoded( {extended: true} ) )
    app.use( express.urlencoded( {extended: true} ) )
    app.use( express.json() )
    app.use( morgan("combined", { Stream }) )
    app.use("/api/v1", routes)

    switch( config.protocol ) {
        case constants.HTTP:
            runHttp()
            break 

        case constants.HTTPS:
            runHttps()
            break
    }
}

const runHttps = () => {
    const cors = require("cors")
    const https = require("https")

    let certs = { 
        "key" : fs.readFileSync(config.cert.keyFileName ),
        "cert": fs.readFileSync(config.cert.certFileName)
    }

    app.set("trust proxy", true)
    app.use(cors())

    try { 
        https.createServer(certs, app).listen(config.port, () => { 
            Logger.info(`middleware running on https:${config.port}`)
        })

    } catch (err) { 
        Logger.warn(err)
        process.exit(1)
    }
}

const runHttp = () => { 
    const http = require("http")

    try { 
        http.createServer().listen(config.port, constants.LOCAL_HOST, () => {
            Logger.info(`middleware running on http:${config.port}`)
        })

    } catch(err) {
        Logger.warn(err)
        process.exit(1)
    }
}

init()