const express = require('express');
const router = express.Router();
const cabinet_middle = require("../middleware/cabinet_middle");
const mid_data = require("../middleware/data_middle");
const format = require('response-format');


const {
    action_get_all_cabinet_payment_status,
    action_get_all_cabinet_type,
    action_get_all_company,
    action_get_division,
    action_get_employee 
} = require("../controllers/action_util_controller");





router.post('/get_all_cabinet_payment_status',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_get_all_cabinet_payment_status
);




router.post('/get_all_cabinet_type',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_get_all_cabinet_type
);


router.post('/get_all_company',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_get_all_company
);


router.post('/get_division',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_get_division
);


router.post('/get_employee',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_get_employee
);








module.exports = router;