const express = require('express');
const router = express.Router();
const cabinet_middle = require("../middleware/cabinet_middle");
const mid_data = require("../middleware/data_middle");


const {
    action_vt_parking_analyst_date_in,
    action_vt_parking_analyst_date_out,
    action_vt_parking_analyst_year_month_in,
    action_vt_parking_analyst_year_month_out,
    action_vt_parking_analyst_year_in,
    action_vt_parking_analyst_year_out,
    action_parking_outstanding
} = require("../controllers/action_reports_analyst_controller");



//ค้นหาขาเข้า วัน/เดือน/ปี
router.post('/vt_parking_analyst_date/in',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
   action_vt_parking_analyst_date_in
);




//ค้นหาขาออก วัน/เดือน/ปี
router.post('/vt_parking_analyst_date/out',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_analyst_date_out
);



//ค้นหาขาเข้า เดือน/ปี
router.post('/vt_parking_analyst_year_month/in',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_analyst_year_month_in
);



//ค้นหาขาออก เดือน/ปี
router.post('/vt_parking_analyst_year_month/out',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_analyst_year_month_out
);



//ค้นหาขาเข้า เดือน/ปี
router.post('/vt_parking_analyst_year/in',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_analyst_year_in
);



//ค้นหาขาออก เดือน/ปี
router.post('/vt_parking_analyst_year/out',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_analyst_year_out
);


//รถคงค้าง
router.post('/parking_analyst_outstanding',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_parking_outstanding
);




module.exports = router;




