
const {
    db_action_vt_parking_in_visitor_info 
}
   = require("../models/db_action_reports_visitor_model");
const format = require('response-format');
const util_fun = require("../utils/util_fun");



exports.action_vt_parking_in_visitor_info = (req, res) => {

   db_action_vt_parking_in_visitor_info(req.body, (err, data) => {
       if (data === null) {
           let data_res_error = format.create('200', true, "ddb_action_vt_parking_in_visitor_info_fail", null)
           res.send(data_res_error);
           util_fun.show_log_res_fatal(req,data_res_error)
       } else {
           let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
           res.send(data_res);
       }
   });

}