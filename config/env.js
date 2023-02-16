const config_env = {
    db_config: {

        //UAT//
        HOST_DB: "178.128.126.37",
        PORT_DB: 5432,
        DATABASE_DB: "cit_parking_silomedge_db",
        USER_DB: "postgres",
        PASSWORD_DB: "Cit@pwddb",
        max: 20,
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 2000,


        // // PRODUCTTION 
        // HOST_DB: "localhost",
        // PORT_DB: 35432,
        // DATABASE_DB: "cit_parking_db",
        // USER_DB: "postgres",
        // PASSWORD_DB: "Cit@pwddb",
        // max: 20,
        // idleTimeoutMillis: 0,
        // connectionTimeoutMillis: 2000,


    },
    main_config: {
        PORT: 39004,
        APP_NAME: "api_report_siromedge",
        IP_SERVER: "10.1.10.252"

    }


}



module.exports = config_env;