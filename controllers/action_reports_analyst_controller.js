
const {  
    db_action_vt_parking_analyst_date_in,
    db_action_vt_parking_analyst_date_out,
    db_action_vt_parking_analyst_year_month_in,
    db_action_vt_parking_analyst_year_month_out,
    db_action_vt_parking_analyst_year_in,
    db_action_vt_parking_analyst_year_out,
    db_action_parking_outstanding
}
    = require("../models/db_action_reports_analyst_model");
const format = require('response-format');
const util_fun = require("../utils/util_fun");


exports.action_parking_outstanding = (req, res) => {

    db_action_parking_outstanding(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_parking_outstanding_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}




exports.action_vt_parking_analyst_date_in = (req, res) => {

    db_action_vt_parking_analyst_date_in(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_analyst_date_in_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}






exports.action_vt_parking_analyst_date_out = (req, res) => {

    db_action_vt_parking_analyst_date_out(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_analyst_date_out_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}




exports.action_vt_parking_analyst_year_month_in = (req, res) => {

    db_action_vt_parking_analyst_year_month_in(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_analyst_year_month_in_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}





exports.action_vt_parking_analyst_year_month_out = (req, res) => {

    db_action_vt_parking_analyst_year_month_out(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_analyst_year_month_out_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}







exports.action_vt_parking_analyst_year_in = (req, res) => {

    db_action_vt_parking_analyst_year_in(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_analyst_year_in_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}







exports.action_vt_parking_analyst_year_out = (req, res) => {

    db_action_vt_parking_analyst_year_out(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_analyst_year_out_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {
          
            let data_res = format.create('200', false, null, {"header_data":req.body,"sub_data":data})
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}

