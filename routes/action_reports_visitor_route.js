const express = require('express');
const router = express.Router();
const cabinet_middle = require("../middleware/cabinet_middle");
const mid_data = require("../middleware/data_middle");
const format = require('response-format');


const { 
    action_vt_parking_in_visitor_info
} = require("../controllers/action_reports_visitor_controller");






router.post('/vt_parking_in_visitor_info',
    mid_data.data_mid,
    cabinet_middle.check_cabinet_code,
    action_vt_parking_in_visitor_info
);















module.exports = router;