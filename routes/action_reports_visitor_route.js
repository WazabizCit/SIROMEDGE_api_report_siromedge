const express = require('express');
const router = express.Router();
const cabinet_middle = require("../middleware/cabinet_middle");
const mid_data = require("../middleware/data_middle");
const format = require('response-format');


const { 
    
    action_vt_parking_payment_visitor_info_by_id_cabinet,
    action_vt_parking_payment_visitor_info_all_cabinet,
    action_vt_parking_visitor_car_history,
    action_vt_parking_visitor_motorcycle_history,
    action_vt_parking_estamp_visitor_history_date,
    action_vt_parking_estamp_visitor_history_employee,
    action_vt_parking_estamp_visitor_history_division,
    action_vt_parking_payment_visitor_min_max_receipt

} = require("../controllers/action_reports_visitor_controller");






router.post('/vt_parking_payment_visitor_info_by_id_cabinet',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_payment_visitor_info_by_id_cabinet
);




router.post('/vt_parking_payment_visitor_info_all_cabinet',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_payment_visitor_info_all_cabinet
);


router.post('/vt_parking_payment_visitor_min_max_receipt',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_payment_visitor_min_max_receipt
);



router.post('/vt_parking_visitor_car_history',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_visitor_car_history
);




router.post('/vt_parking_visitor_motorcycle_history',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_visitor_motorcycle_history
);




router.post('/vt_parking_estamp_visitor_history/date',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_estamp_visitor_history_date
);




router.post('/vt_parking_estamp_visitor_history/employee',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_estamp_visitor_history_employee
);



router.post('/vt_parking_estamp_visitor_history/division',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_estamp_visitor_history_division
);




module.exports = router;