

const pool = require("../config/db_con");




exports.db_action_vt_parking_in_visitor_info = function (obj, callback) {

    let report_start = obj.m_report_start
    let report_end = obj.m_report_end
    let cabinet_payment_id = obj.m_cabinet_payment_id
  
    const query = {
      text: `SELECT 
      cabinet_payment_code,
      cabinet_payment_name,
      payment_type_name_th AS payment_type_name,
      receipt_no,
      card_name,
      license_plate_text,
      fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
      fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
      carparking_interval,
      pivi.estamp_info_id,
      pivi.estamp_info_name,
      estamp_info_by,
      employee_center_code AS estamp_info_by_code,
      (employee_center_firstname||' '||employee_center_lastname) AS estamp_info_by_name,
      payment_time,
      payment_amount,
      fun_excute_vat(payment_amount) AS payment_vat,
      payment_fine_amount,
      pay_emp_code AS payment_emp_code,
      pay_emp_fullname_th AS payment_emp_name,
      pay_emp_username,
      cabinet_in_send_data->'m_location_car_picture' as location_car_picture_in,
      cabinet_in_send_data->'m_location_user_picture' as location_user_picture_in,
      cabinet_out_send_data->'m_location_car_picture' as location_car_picture_out,
      cabinet_out_send_data->'m_location_user_picture' as location_user_picture_out,
      to_char((payment_time_not_format - (carparking_in_time + (estamp_info_value||''||estamp_info_unit)::interval)), 'HH24:MI:SS') as payment_estamp_interval
      FROM 
      vt_parking_in_visitor_info pivi 
      LEFT JOIN mcv_employee_center mvec ON pivi.estamp_info_by = mvec.employee_center_id 
      LEFT JOIN mv_estamp_info mvei ON mvei.estamp_info_id = pivi.estamp_info_id 
      WHERE 
      cabinet_payment_id = $3 AND 
      payment_type_id NOT IN(1) AND 
      payment_time_not_format BETWEEN $1::timestamp AND $2::timestamp
      ORDER BY payment_type_id,payment_time_not_format,receipt_running_number
  
  `,
      values: [report_start, report_end, cabinet_payment_id],
    }
  
    pool.connect().then(client => {
      return client.query(query)
        .then(result => {
  
          client.release(true)
          return callback(false, result.rows)
  
        })
        .catch(err => {
          console.log(err)
          client.release(true)
          return callback(true, null)
  
        })
    })
  
  
  
  }
  
  