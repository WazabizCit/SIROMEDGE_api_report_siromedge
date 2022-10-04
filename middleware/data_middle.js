
const util_fun = require("../utils/util_fun");

exports.data_mid = (req,res,next)=>{      
        util_fun.show_log_req(req)
        next()      
}


