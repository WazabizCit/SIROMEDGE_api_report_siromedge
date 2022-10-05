const express = require('express');
const router = express.Router();
const cabinet_middle = require("../middleware/cabinet_middle");
const mid_data = require("../middleware/data_middle");
const format = require('response-format');


const { 
    action_vt_parking_in_visitor_info,
    action_vt_parking_visitor_car_history,
    action_vt_parking_visitor_motorcycle_history
} = require("../controllers/action_reports_visitor_controller");






router.post('/vt_parking_in_visitor_info',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_in_visitor_info
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














module.exports = router;