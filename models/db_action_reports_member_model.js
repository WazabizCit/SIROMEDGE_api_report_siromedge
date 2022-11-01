
const pool = require("../config/db_con");





exports.db_action_vt_parking_in_member_info = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let cabinet_payment_id = obj.m_cabinet_payment_id


  const query = {

    text: `
    SELECT 
    cabinet_payment_code,
    cabinet_payment_name,
    payment_type_name_th AS payment_type_name,
    receipt_no,
    employee_id ,
    license_plate_text,
    fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
    fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
    carparking_interval,
    estamp_info_id,
    estamp_info_name,
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
    cabinet_out_send_data->'m_location_user_picture' as location_user_picture_out
    FROM 
    vt_parking_in_member_info pimi 
    LEFT JOIN mcv_employee_center mvec ON pimi.estamp_info_by = mvec.employee_center_id 
    LEFT JOIN m_employee_api mea ON pimi.card_code = mea.employee_api_code
    WHERE 
    cabinet_payment_id = $3 AND 
    payment_type_id NOT IN(1) AND 
    payment_time_not_format BETWEEN $1::timestamp AND $2::timestamp
    ORDER BY payment_type_id,payment_time_not_format,receipt_running_number`,

    values: [report_start, report_end, cabinet_payment_id],
  }

  pool.connect().then(client => {
    return client.query(query)
      .then(result => {

        client.release(true)
        return callback(false, result.rows)

      })
      .catch(err => {
        client.release(true)
        console.log(err)
        return callback(true, null)

      })
  })



}







exports.db_action_vt_parking_member_car_history = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end




  const query = {
    text: `  
select tci_id,tci.card_status, car_type_status, card_code,card_signature,employee_id,employee_name,license_plate_text,
mcb_in.cabinet_name as cabinet_name_in,
to_char(carparking_in_time,'DD/MM/YYYY HH24:MI:SS') as carparking_in_time,
(case when mcb_out.cabinet_name is null then mcb_pm.cabinet_name else  mcb_out.cabinet_name  end)as cabinet_name_out,
to_char(carparking_out_time,'DD/MM/YYYY HH24:MI:SS') as carparking_out_time,
tci.estamp_info_status,
estamp_info_name,tci_status,
tci.cabinet_in_send_data->'m_location_car_picture' as location_car_picture_in,
tci.cabinet_in_send_data->'m_location_user_picture' as location_user_picture_in,
tci.cabinet_out_send_data->'m_location_car_picture' as location_car_picture_out,
tci.cabinet_out_send_data->'m_location_user_picture' as location_user_picture_out

from t_carparking_info tci
join m_employee_api mc ON tci.card_code = mc.employee_api_code
left join mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
left join m_cabinet mcb_in ON tci.cabinet_in_id = mcb_in.cabinet_id 
left join m_cabinet mcb_out ON tci.cabinet_out_id = mcb_out.cabinet_id 
left join m_cabinet mcb_pm ON tci.cabinet_id = mcb_pm.cabinet_id 
where tci.card_status = 'MC' 
AND 
carparking_in_time::timestamp between $1::timestamp AND $2::timestamp
order by carparking_in_time
`,
    values: [report_start, report_end],
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







exports.db_action_vt_parking_member_motorcycle_history = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end


  const query = {
    text: `  
select tci_id,tci.card_status,car_type_status,  card_code,card_signature,employee_id,employee_name,license_plate_text,
mcb_in.cabinet_name as cabinet_name_in,
to_char(carparking_in_time,'DD/MM/YYYY HH24:MI:SS') as carparking_in_time,
(case when mcb_out.cabinet_name is null then mcb_pm.cabinet_name else  mcb_out.cabinet_name  end)as cabinet_name_out,
to_char(carparking_out_time,'DD/MM/YYYY HH24:MI:SS') as carparking_out_time,
tci.estamp_info_status,
estamp_info_name,tci_status,
tci.cabinet_in_send_data->'m_location_car_picture' as location_car_picture_in,
tci.cabinet_in_send_data->'m_location_user_picture' as location_user_picture_in,
tci.cabinet_out_send_data->'m_location_car_picture' as location_car_picture_out,
tci.cabinet_out_send_data->'m_location_user_picture' as location_user_picture_out

from t_carparking_info tci
join m_employee_api mc ON tci.card_code = mc.employee_api_code
left join mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
left join m_cabinet mcb_in ON tci.cabinet_in_id = mcb_in.cabinet_id 
left join m_cabinet mcb_out ON tci.cabinet_out_id = mcb_out.cabinet_id 
left join m_cabinet mcb_pm ON tci.cabinet_id = mcb_pm.cabinet_id 
where tci.card_status = 'MM'
AND 
carparking_in_time::timestamp between $1::timestamp AND $2::timestamp
order by carparking_in_time
`,
    values: [report_start, report_end],
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
