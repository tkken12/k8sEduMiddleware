const express = require("express")
const app = express()
const config = require("./config.json") 
const fs = require("fs")
const bodyParser = require("body-parser")
const { Constants } = require("./common/const")
const routes = require("./routes/routes")
const morgan = require("morgan")
const { Logger, Stream } = require("./logger/loggerConfig")
const cors = require("cors")

require("dotenv").config({path: ".env"})

const init = () => { 

    app.use( cors())
    app.use( bodyParser.urlencoded( {extended: true} ) )
    app.use( express.urlencoded( {extended: true} ) )
    app.use( express.json() )
    app.use( morgan("combined", { Stream }) )
    app.use("/api/v1", routes)

    switch( config.protocol ) {
        case Constants.HTTP:
            runHttp()
            break 

        case Constants.HTTPS:
            runHttps()
            break
    }
}

const runHttps = () => {
    const https = require("https")

    let certs = { 
        "key" : fs.readFileSync(config.cert.keyFileName ),
        "cert": fs.readFileSync(config.cert.certFileName)
    }

    app.set("trust proxy", true)

    try { 
        https.createServer(certs, app).listen(config.port, () => { 
            Logger.info(`middleware running on https://${Constants.LOCAL_HOST}:${config.port}`)
        })

    } catch (err) { 
        Logger.warn(err)
        process.exit(1)
    }
}

const runHttp = () => { 
    const http = require("http")

    try { 
        http.createServer(app).listen(config.port,  () => {
            Logger.info(`middleware running on http://${Constants.LOCAL_HOST}:${config.port}`)
        })

    } catch(err) {
        Logger.warn(err)
        process.exit(1)
    }
}

init()