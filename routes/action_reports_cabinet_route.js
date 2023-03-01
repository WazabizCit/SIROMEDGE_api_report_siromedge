const express = require('express');
const router = express.Router();
const cabinet_middle = require("../middleware/cabinet_middle");
const mid_data = require("../middleware/data_middle");


const {
    action_vt_cabinet_withdraw_deposit_sub_date
} = require("../controllers/action_reports_cabinet_controller");



//รายงานฝากถอนเงิน
router.post('/vt_cabinet_withdraw_deposit_sub/kiosk_in/date',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_cabinet_withdraw_deposit_sub_date
);




module.exports = router;




