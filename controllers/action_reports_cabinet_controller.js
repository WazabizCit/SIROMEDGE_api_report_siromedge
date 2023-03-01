
const {  
    db_action_vt_cabinet_withdraw_deposit_sub_date
}
    = require("../models/db_action_reports_cabinet_model");
const format = require('response-format');
const util_fun = require("../utils/util_fun");


exports.action_vt_cabinet_withdraw_deposit_sub_date = (req, res) => {

    db_action_vt_cabinet_withdraw_deposit_sub_date(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_cabinet_withdraw_deposit_sub_date_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}


