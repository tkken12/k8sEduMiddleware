const Constants = { 
    HTTP: "http",
    HTTPS: "https",
    LOCAL_HOST: "127.0.0.1",
    REQUEST_PATH: {
        METHOD: {
            GET   : "get",
            POST  : "post",
            PUT   : "put",
            DELETE: "delete"
        },
        BROKER_PATH: {
            API: {
                V1: {
                    POD: {
                        GET: "/api/v1/pod"
                    }
                }
            }
        }
    },
}

module.exports = { 
    Constants
}