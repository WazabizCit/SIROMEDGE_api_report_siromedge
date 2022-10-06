
const {
    db_action_get_all_cabinet_payment_status,
    db_action_get_all_cabinet_type,
    db_action_get_all_company,
    db_action_get_division,
    db_action_get_employee
}
    = require("../models/db_util_model");
const format = require('response-format');
const util_fun = require("../utils/util_fun");






exports.action_get_all_company = (req, res) => {

    db_action_get_all_company(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_get_all_company_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {

            let data_res = format.create('200', false, null, data)
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}


exports.action_get_division = (req, res) => {

    db_action_get_division(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_get_division_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {

            let data_res = format.create('200', false, null, data)
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}


exports.action_get_employee = (req, res) => {

    db_action_get_employee(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_get_employee_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {

            let data_res = format.create('200', false, null, data)
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}



exports.action_get_all_cabinet_payment_status = (req, res) => {

    db_action_get_all_cabinet_payment_status(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_get_all_cabinet_payment_status_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {

            let data_res = format.create('200', false, null, data)
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}




exports.action_get_all_cabinet_type = (req, res) => {

    db_action_get_all_cabinet_type(req.body, (err, data) => {

        if (data === null) {
            let data_res_error = format.create('200', true, "db_action_get_all_cabinet_type_fail", null)
            res.send(data_res_error);
            util_fun.show_log_res_fatal(req,data_res_error)

        } else {

            let data_res = format.create('200', false, null, data)
            res.send(data_res);
            util_fun.show_log_res_info(req,data_res)

        }

    });


}



