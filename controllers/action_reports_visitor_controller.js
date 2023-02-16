
const {

    db_action_vt_parking_payment_visitor_info_by_id_cabinet ,
    db_action_vt_parking_payment_visitor_info_all_cabinet,
    db_action_vt_parking_visitor_car_history,
    db_action_vt_parking_visitor_motorcycle_history,
    db_action_vt_parking_estamp_visitor_history_date,
    db_action_vt_parking_estamp_visitor_history_employee,
    db_action_vt_parking_estamp_visitor_history_division,
    db_action_vt_parking_estamp_visitor_history_company,
    db_action_vt_parking_payment_visitor_min_max_receipt,
    db_action_vt_parking_visitor_card_lost_and_damaged_history,
    db_action_vt_parking_payment_visitor_info_all_cabinet_car_or_motorcycle,
    db_action_vt_parking_payment_visitor_info_by_id_cabinet_car_or_motorcycle,
    db_action_vt_parking_payment_visitor_min_max_receipt_car_or_motorcycle
    
    
}
   = require("../models/db_action_reports_visitor_model");
const format = require('response-format');
const util_fun = require("../utils/util_fun");




exports.action_vt_parking_visitor_card_lost_and_damaged_history = (req, res) => {

    db_action_vt_parking_visitor_card_lost_and_damaged_history(req.body, (err, data) => {
        if (data === null) {
            let data_error = format.create('200', true, "db_action_vt_parking_visitor_card_lost_and_damaged_history_fail", null)
            res.send(data_error);
            util_fun.show_log_res_fatal(req, data_error)
        } else {
            let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
            res.send(data_res);
            util_fun.show_log_res_info(req, data_res)
        }
    });

}




exports.action_vt_parking_payment_visitor_min_max_receipt = (req, res) => {

    db_action_vt_parking_payment_visitor_min_max_receipt(req.body, (err, data) => {
       if (data === null) {
           let data_res_error = format.create('200', true, "db_action_vt_parking_payment_visitor_min_max_receipt_fail", null)
           res.send(data_res_error);
           util_fun.show_log_res_fatal(req,data_res_error)
       } else {
           let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
           res.send(data_res);
       }
   });

}


exports.action_vt_parking_payment_visitor_min_max_receipt_car_or_motorcycle = (req, res) => {

    db_action_vt_parking_payment_visitor_min_max_receipt_car_or_motorcycle(req.body, (err, data) => {
       if (data === null) {
           let data_res_error = format.create('200', true, "db_action_vt_parking_payment_visitor_min_max_receipt_car_or_motorcycle_fail", null)
           res.send(data_res_error);
           util_fun.show_log_res_fatal(req,data_res_error)
       } else {
           let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
           res.send(data_res);
       }
   });

}



exports.action_vt_parking_payment_visitor_info_by_id_cabinet = (req, res) => {

    db_action_vt_parking_payment_visitor_info_by_id_cabinet(req.body, (err, data) => {
       if (data === null) {
           let data_res_error = format.create('200', true, "db_action_vt_parking_payment_visitor_info_by_id_cabinet_fail", null)
           res.send(data_res_error);
           util_fun.show_log_res_fatal(req,data_res_error)
       } else {
           let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
           res.send(data_res);
       }
   });

}



exports.action_vt_parking_payment_visitor_info_by_id_cabinet_car_or_motorcycle = (req, res) => {

    db_action_vt_parking_payment_visitor_info_by_id_cabinet_car_or_motorcycle(req.body, (err, data) => {
       if (data === null) {
           let data_res_error = format.create('200', true, "db_action_vt_parking_payment_visitor_info_by_id_cabinet_car_or_motorcycle_fail", null)
           res.send(data_res_error);
           util_fun.show_log_res_fatal(req,data_res_error)
       } else {
           let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
           res.send(data_res);
       }
   });

}





exports.action_vt_parking_payment_visitor_info_all_cabinet = (req, res) => {

    db_action_vt_parking_payment_visitor_info_all_cabinet(req.body, (err, data) => {
       if (data === null) {
           let data_res_error = format.create('200', true, "db_action_vt_parking_payment_visitor_info_all_cabinet_fail", null)
           res.send(data_res_error);
           util_fun.show_log_res_fatal(req,data_res_error)
       } else {
           let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
           res.send(data_res);
       }
   });

}




exports.action_vt_parking_payment_visitor_info_all_cabinet_car_or_motorcycle = (req, res) => {

    db_action_vt_parking_payment_visitor_info_all_cabinet_car_or_motorcycle(req.body, (err, data) => {
       if (data === null) {
           let data_res_error = format.create('200', true, "db_action_vt_parking_payment_visitor_info_all_cabinet_car_or_motorcycle_fail", null)
           res.send(data_res_error);
           util_fun.show_log_res_fatal(req,data_res_error)
       } else {
           let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
           res.send(data_res);
       }
   });

}




exports.action_vt_parking_visitor_car_history = (req, res) => {

    db_action_vt_parking_visitor_car_history(req.body, (err, data) => {
        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_visitor_car_history_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)
            
        } else {
            let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)
        }
    });

}





exports.action_vt_parking_visitor_motorcycle_history = (req, res) => {

    db_action_vt_parking_visitor_motorcycle_history(req.body, (err, data) => {
        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_vt_parking_visitor_motorcycle_history_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)
            
        } else {
            let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)
        }
    });

}






exports.action_vt_parking_estamp_visitor_history_date = (req, res) => {

    db_action_vt_parking_estamp_visitor_history_date(req.body, (err, data) => {
        if (data === null) {
            let data_res_default = format.create('200', true, "db_action_vt_parking_estamp_visitor_history_date_fail", null)
            res.send(data_res_default);
            util_fun.show_log_res_fatal(req,data_res_default)
        } else {
            let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)
        }
    });

}




exports.action_vt_parking_estamp_visitor_history_employee = (req, res) => {

    db_action_vt_parking_estamp_visitor_history_employee(req.body, (err, data) => {
        if (data === null) {
            let data_res_default = format.create('200', true, "db_action_vt_parking_estamp_visitor_history_employee_fail", null)
            res.send(data_res_default);
            util_fun.show_log_res_fatal(req,data_res_default)
        } else {
            let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)
        }
    });

}



exports.action_vt_parking_estamp_visitor_history_division = (req, res) => {

    db_action_vt_parking_estamp_visitor_history_division(req.body, (err, data) => {
        if (data === null) {
            let data_res_default = format.create('200', true, "db_action_vt_parking_estamp_visitor_history_division_fail", null)
            res.send(data_res_default);
            util_fun.show_log_res_fatal(req,data_res_default)
        } else {
            let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)
        }
    });

}


exports.action_vt_parking_estamp_visitor_history_company = (req, res) => {

    db_action_vt_parking_estamp_visitor_history_company(req.body, (err, data) => {
        if (data === null) {
            let data_res_default = format.create('200', true, "db_action_vt_parking_estamp_visitor_history_company_fail", null)
            res.send(data_res_default);
            util_fun.show_log_res_fatal(req,data_res_default)
        } else {
            let data_res = format.create('200', false, null, { "header_data": req.body, "sub_data": data })
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)
        }
    });

}








