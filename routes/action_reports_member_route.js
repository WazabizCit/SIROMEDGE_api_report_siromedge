const express = require('express');
const router = express.Router();
const cabinet_middle = require("../middleware/cabinet_middle");
const mid_data = require("../middleware/data_middle");



const { 
    action_vt_parking_in_member_info,
    action_vt_parking_member_car_history,
    action_vt_parking_member_motorcycle_history,
    action_get_allmember
} = require("../controllers/action_reports_member_controller");






router.post('/vt_parking_in_member_info',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_in_member_info
);



router.post('/vt_parking_member_car_history',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_member_car_history
);


router.post('/vt_parking_member_motorcycle_history',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_member_motorcycle_history
);


router.post('/get_allmember', 
mid_data.data_mid,
cabinet_middle.check_cabinet_code,
action_get_allmember
);











module.exports = router;