const Constants = { 
    HTTP: "http",
    HTTPS: "https",
    LOCAL_HOST: "127.0.0.1",
    HTTP_STATUS_CODE: {
        200: 200,
        400: 400,
        401: 401,
        403: 403,
        500: 500,
    },
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
                    DASHBOARD: {
                        GET: "/api/v1/dashboard",
                    },
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