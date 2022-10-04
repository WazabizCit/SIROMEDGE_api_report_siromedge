const format = require('response-format');
const { db_cabinet_status } = require("../models/db_util_model");
const util_fun = require("../utils/util_fun");


exports.check_cabinet_code = (req, res, next) => {


    db_cabinet_status(req.body, (err, data) => {


        if (data == null) {

            let data_error = format.create('200', true, "db_cabinet_status_fail", null)
            res.send(data_error)
            util_fun.show_log_res_fatal(req, data_error)

        } else {

            if (data.length == 1) {

                req.body["cabinet_obj"] = data[0]
                next()

            } else {


                let data_res = format.create('200', true, "ไม่พบ IP เครื่อง Cabinet", null)
                util_fun.show_log_res_warning(req, data_res)
                res.send(data_res)

            }

        }





    });


}



