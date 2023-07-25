let moment = require('moment-timezone');
var log4js = require("log4js");
let config = require("../config/env");


log4js.configure({
    appenders: {
        appender: {
            backups:500,
            type: 'file',
            filename: `../logs/${config.main_config.APP_NAME}/log`,
            keepFileExt: true,
            compress: false,
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
    },
    categories: {
        default: {
            appenders: ['appender'],
            level: 'all',
        },
    },
});

const logger = log4js.getLogger();
logger.level = "debug";

exports.show_log_res_info = (req, obj) => {

    let originalUrl = req.originalUrl
    let remoteAddress =  req.socket.remoteAddress
    let remotePort = req.socket.remotePort
    let app_name  = config.main_config.APP_NAME
    let sub_app_name  = req.baseUrl
    let node_id  =  "0"
    let status  =  "RES"


    try {
        
        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.info(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},    
        DATA : ${JSON.stringify(obj)}`);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},  
        DATA : ${JSON.stringify(obj)}`
        )

    } catch (error) {

        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.error(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl}
        `);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl} 
       `
        )
    }
}


exports.show_log_res_warning = (req, obj) => {

    let originalUrl = req.originalUrl
    let remoteAddress =  req.socket.remoteAddress
    let remotePort = req.socket.remotePort
    let app_name  = config.main_config.APP_NAME
    let sub_app_name  = req.baseUrl
    let node_id  =  "0"
    let status  =  "RES"


    try {

        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.warn(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},    
        DATA : ${JSON.stringify(obj)}`);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},  
        DATA : ${JSON.stringify(obj)}`
        )

    } catch (error) {


        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.error(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl}
        `);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl} 
       `
        )

    }

}


exports.show_log_res_error = (req, obj) => {

    let originalUrl = req.originalUrl
    let remoteAddress =  req.socket.remoteAddress
    let remotePort = req.socket.remotePort
    let app_name  = config.main_config.APP_NAME
    let sub_app_name  = req.baseUrl
    let node_id  =  "0"
    let status  =  "RES"

    try {

        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.error(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},    
        DATA : ${JSON.stringify(obj)}`);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},  
        DATA : ${JSON.stringify(obj)}`
        )

    } catch (error) {

        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.error(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl}
        `);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl} 
       `
        )


    }

}



exports.show_log_res_fatal = (req, obj) => {


    let originalUrl = req.originalUrl
    let remoteAddress =  req.socket.remoteAddress
    let remotePort = req.socket.remotePort
    let app_name  = config.main_config.APP_NAME
    let sub_app_name  = req.baseUrl
    let node_id  =  "0"
    let status  =  "RES"

    try {

   
        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.fatal(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},    
        DATA : ${JSON.stringify(obj)}`);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},  
        DATA : ${JSON.stringify(obj)}`
        )





    } catch (error) {

     
        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.error(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl}
        `);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl} 
       `
        )

    }
}





exports.show_log_req = (req) => {

    let req_body = req.body 
    let originalUrl = req.originalUrl
    let remoteAddress =  req.socket.remoteAddress
    let remotePort = req.socket.remotePort
    let app_name  = config.main_config.APP_NAME
    let sub_app_name  = req.baseUrl
    let node_id  =  "0"
    let status  =  "REQ"

    try {    


        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.info(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},    
        DATA : ${JSON.stringify(req_body)}`);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl},  
        DATA : ${JSON.stringify(req_body)}`
        )


    } catch (error) {

        let timestamp = moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
        logger.error(`
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl}
        `);

        return console.log(
        `
        TIMESTAMP => ${timestamp},
        APP_NAME => ${app_name},
        SUB_APP_NAME => ${sub_app_name},
        NODE_ID => ${node_id},
        STATUS => ${status},
        REMOTE_ADDRESS => ${remoteAddress},
        REMOTE_PORT => ${remotePort},
        ORIGINALURL => ${originalUrl} 
       `
        )
        
    }
}

