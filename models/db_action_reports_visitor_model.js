const pool = require("../config/db_con");





exports.db_action_vt_parking_visitor_card_lost_and_damaged_history = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let card_status = obj.m_card_status

  const query = {
    text: `
    SELECT 
        lcfi.tlcfi_id, 
        tci.card_signature as card_name,
        tci.card_status,
        tci.license_plate_text,
        tci.car_type_status,
        fun_parking_datetime_format(tci.carparking_in_time) AS carparking_in_time,
        payment_type_name_th,
        payment_event_name_th,
        lcfi.receipt_no,
        lcfi.payment_totle AS payment_total,	
        mey.employee_code as employee_code_pos ,
        (mey.first_name_th ||' '||mey.last_name_th) AS employee_fullname_pos,	
        fun_parking_datetime_format(lcfi.payment_time) as payment_time
        FROM 
        t_lost_card_fine_info lcfi 
        LEFT JOIN t_carparking_info tci ON lcfi.tci_id = tci.tci_id
        LEFT JOIN m_payment_type mpt ON lcfi.payment_type_id = mpt.payment_type_id 
        LEFT JOIN m_payment_event mpe ON lcfi.payment_event_id = mpe.payment_event_id 
        LEFT JOIN m_card mc ON lcfi.card_code = mc.card_code 
        LEFT JOIN m_employee mey ON lcfi.create_by::integer = mey.employee_id
        WHERE lcfi.payment_event_id IN(6,7,16,17) 	
        AND tci.card_status = $3
        AND (lcfi.payment_time BETWEEN $1::timestamp AND $2::timestamp)
        ORDER BY lcfi.payment_time`,
    values: [report_start, report_end, card_status],
  }
  pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(result => {
          client.release(true)
          return callback(null, result.rows)
        })
        .catch(err => {
          console.log(err)
          client.release(true)
          return callback(null, null)
        })
    })

}



exports.db_action_vt_parking_payment_visitor_min_max_receipt = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end


  const query = {
    text: `SELECT 
    cabinet_payment_id,
    cabinet_payment_code,
    cabinet_payment_tax_code,
    cabinet_payment_name,
    to_char(payment_time,'DD/MM/YYYY') AS payment_time,
    payment_type_code,
    payment_type_name_th,
    payment_event_code,
    payment_event_name_th,
    card_type_id,
    car_type_status,
    receipt_code,
    to_char(MIN(receipt_running_number),'00000') AS min_receipt_no,
    to_char(MAX(receipt_running_number),'00000') AS max_receipt_no,
    SUM(payment_fee_amount) AS sum_payment_fee_amount,
    SUM(payment_vat) AS sum_payment_vat,
    SUM(payment_fine_amount) AS sum_payment_fine_amount
    FROM 
    vt_parking_payment_visitor_info 
    WHERE 
    payment_time::DATE BETWEEN $1::timestamp AND $2::timestamp 
    GROUP BY 
    cabinet_payment_id,
    cabinet_payment_code,
    cabinet_payment_tax_code,
    cabinet_payment_name,
    to_char(payment_time,'DD/MM/YYYY'),
    payment_type_id,
    payment_type_code,
    payment_type_name_th,
    payment_event_id,
    payment_event_code,
    payment_event_name_th,
    card_type_id,
    car_type_status,
    receipt_code
    ORDER BY 
    cabinet_payment_id,card_type_id,payment_type_id,payment_event_id
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









exports.db_action_vt_parking_payment_visitor_info_all_cabinet = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end




  const query = {
    text: `SELECT 
    tcpi_id,
    cabinet_payment_code,
    cabinet_payment_name,
    payment_type_name_th AS payment_type_name,
    receipt_no,
    card_code,
    card_signature,
    license_plate_text,
    car_type_status,
    fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
    cabinet_in_name,
    fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
    cabinet_out_name,
    carparking_interval,
    vppvi.estamp_info_id,
    vppvi.estamp_info_name,
    fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
    estamp_info_by,
    employee_center_code AS estamp_info_by_code,
    (employee_firstname_estamp||' '||employee_center_code) AS estamp_employee_name,
    company_name AS company_name_estamp,
    division_name AS division_name_estamp,
    fun_parking_datetime_format(payment_time) AS payment_time,
    payment_fee_amount,
    payment_vat,
    payment_fine_amount,
    payment_total,
    cabinet_payment_data ->> 'ref1' as ref1,
    cabinet_payment_data ->> 'ref2' as ref2,
    create_emp_fullname as pos_emp_fullname,
    (SELECT sps_json_data->>'domain_get_img' AS domain_get_img  FROM m_system_parking_setup WHERE sps_id = 28 ),
    cabinet_in_send_data->>'m_location_car_picture' as location_car_picture_in,
    cabinet_in_send_data->>'m_location_user_picture' as location_user_picture_in,
    cabinet_out_send_data->>'m_location_car_picture' as location_car_picture_out,
    cabinet_out_send_data->>'m_location_user_picture' as location_user_picture_out
    FROM 
    vt_parking_payment_visitor_info vppvi 
    WHERE 
    vppvi.cabinet_payment_id in(7,8,9,10,11,12,13,18,19,20) AND 
    payment_type_id NOT IN(1)   AND
    payment_time BETWEEN $1::timestamp AND $2::timestamp
    ORDER BY payment_type_id,payment_time,receipt_running_number
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






exports.db_action_vt_parking_payment_visitor_info_by_id_cabinet = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let cabinet_payment_id = obj.m_cabinet_payment_id



  const query = {
    text: `SELECT 
      tcpi_id,
      cabinet_payment_code,
      cabinet_payment_name,
      payment_type_name_th AS payment_type_name,
      receipt_no,
      card_code,
      card_signature,
      license_plate_text,
      car_type_status,
      fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
      cabinet_in_name,
      fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
      cabinet_out_name,
      carparking_interval,
      vppvi.estamp_info_id,
      vppvi.estamp_info_name,
      fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
      estamp_info_by,
      employee_center_code AS estamp_info_by_code,
      (employee_firstname_estamp||' '||employee_center_code) AS estamp_employee_name,
      company_name AS company_name_estamp,
      division_name AS division_name_estamp,
      fun_parking_datetime_format(payment_time) AS payment_time,
      payment_fee_amount,
      payment_vat,
      payment_fine_amount,
      payment_total,
      cabinet_payment_data ->> 'ref1' as ref1,
      cabinet_payment_data ->> 'ref2' as ref2,
      create_emp_fullname as pos_emp_fullname,
      (SELECT sps_json_data->>'domain_get_img' AS domain_get_img  FROM m_system_parking_setup WHERE sps_id = 28 ),
      cabinet_in_send_data->>'m_location_car_picture' as location_car_picture_in,
      cabinet_in_send_data->>'m_location_user_picture' as location_user_picture_in,
      cabinet_out_send_data->>'m_location_car_picture' as location_car_picture_out,
      cabinet_out_send_data->>'m_location_user_picture' as location_user_picture_out
      FROM 
      vt_parking_payment_visitor_info vppvi 
      WHERE 
      vppvi.cabinet_payment_id =  $3 AND 
      payment_type_id NOT IN(1)   AND
      payment_time BETWEEN $1::timestamp AND $2::timestamp
      ORDER BY payment_type_id,payment_time,receipt_running_number
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








exports.db_action_vt_parking_visitor_car_history = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end




  const query = {
    text: `
  select tci_id,tci.card_status,car_type_status,
  card_code,card_signature
  ,license_plate_text,
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
  left join mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
  left join m_cabinet mcb_in ON tci.cabinet_in_id = mcb_in.cabinet_id 
  left join m_cabinet mcb_out ON tci.cabinet_out_id = mcb_out.cabinet_id 
  left join m_cabinet mcb_pm ON tci.cabinet_id = mcb_pm.cabinet_id 
  where tci.card_status = 'VC' AND 
  carparking_in_time::timestamp between $1::timestamp AND $2::timestamp
  order by carparking_in_time`,
    values: [report_start, report_end],
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






exports.db_action_vt_parking_visitor_motorcycle_history = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end




  const query = {
    text: `
  select tci_id,tci.card_status,car_type_status,
  card_code,card_signature
  ,license_plate_text,
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
  left join mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
  left join m_cabinet mcb_in ON tci.cabinet_in_id = mcb_in.cabinet_id 
  left join m_cabinet mcb_out ON tci.cabinet_out_id = mcb_out.cabinet_id 
  left join m_cabinet mcb_pm ON tci.cabinet_id = mcb_pm.cabinet_id 
  where tci.card_status = 'VM' AND 
  carparking_in_time::timestamp between $1::timestamp AND $2::timestamp
  order by carparking_in_time`,
    values: [report_start, report_end],
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






exports.db_action_vt_parking_estamp_visitor_history_date = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end

  const query = {
    text: `WITH input_data AS(
      SELECT 
      $1::timestamp  AS input_time_to,
      $2::timestamp  AS input_time_from,
      0::integer AS input_employee_id,
      0::integer AS input_company_id,
      0::integer AS input_division_id,
      '30 mins'::interval AS input_case_free_over_time
    ),
    result_data AS(
      SELECT  
      tci_id,
      cabinet_in_send_data->'m_card_obj'->>'card_name' AS card_name,
      license_plate_text,
      fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
      fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
      fun_get_parking_datetime_interval(carparking_in_time,carparking_out_time) AS carparking_time_interval_text,
      carparking_out_time - carparking_in_time  AS carparking_time_interval_value,
      fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
      tci.estamp_info_id,
      estamp_info_name,
      estamp_info_value,
      (estamp_info_value ||' '||estamp_info_unit)::interval AS estamp_info_interval,
      tci.estamp_info_by,
      (employee_center_code) AS estamp_info_by_emp_code,
      (employee_center_firstname ||' '||employee_center_lastname) AS estamp_info_by_emp_name,
      tci.estamp_info_data->0->>'card_name' AS card_name,
      tci.estamp_info_data->0->>'card_remark' AS estamp_card_remark,
      tci.estamp_info_data->0->>'company_id' AS company_id,
      mcvc.company_name,
      tci.estamp_info_data->0->>'division_id' AS division_id,
      mcvd.division_name
      FROM 
      t_carparking_info tci 
      LEFT JOIN 
      mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
      LEFT JOIN 
      mcv_employee_center mcvec ON tci.estamp_info_by = mcvec.employee_center_id 
      LEFT JOIN
      mcv_company mcvc ON (tci.estamp_info_data->0->>'company_id')::integer = mcvc.company_id
      LEFT JOIN
      mcv_division mcvd ON (tci.estamp_info_data->0->>'division_id')::integer = mcvd.division_id 
      
      WHERE 
      tci.card_type_id in(1,2) AND
      tci.tci_status = 'Y' AND
      tci.estamp_info_status = true  AND
      tci.carparking_in_time BETWEEN 
      (SELECT input_time_to FROM input_data) AND (SELECT input_time_from FROM input_data)
      
      
    )
    SELECT 
    *,
        (
                CASE WHEN carparking_time_interval_value <= (SELECT input_case_free_over_time FROM input_data) THEN
                true
                ELSE
                false
                END
        )
        AS is_less_time_than_free_parking,
    to_char(
      CASE WHEN 
      (carparking_time_interval_value - estamp_info_interval) > '00:00:00'::interval THEN 
      fun_parking_interval_difference(carparking_time_interval_value,estamp_info_interval) 
      ELSE
      '00:00:00'::interval
      END
    ,'HH24:MI:SS') AS over_estamp_value,
    EXTRACT( DAY FROM carparking_time_interval_value) AS parking_interval_day_text,
    EXTRACT( HOUR FROM carparking_time_interval_value) AS parking_interval_hour_text,
    EXTRACT( MINUTE FROM carparking_time_interval_value) AS parking_interval_minute_text
    FROM result_data 
    ORDER BY 
    carparking_in_time,
    company_id::integer,
    division_id::integer,
    estamp_info_by
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
        client.release(true)
        console.log(err)
        return callback(true, null)

      })
  })



}





exports.db_action_vt_parking_estamp_visitor_history_company = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let company = obj.m_company

  const query = {
    text: `WITH input_data AS(
      SELECT 
      $1::timestamp  AS input_time_to,
      $2::timestamp  AS input_time_from,
      0::integer AS input_employee_id,
      $3::integer AS input_company_id,
      0::integer AS input_division_id,
      '30 mins'::interval AS input_case_free_over_time
    ),
    result_data AS(
      SELECT  
      tci_id,
      cabinet_in_send_data->'m_card_obj'->>'card_name' AS card_name,
      license_plate_text,
      fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
      fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
      fun_get_parking_datetime_interval(carparking_in_time,carparking_out_time) AS carparking_time_interval_text,
      carparking_out_time - carparking_in_time AS carparking_time_interval_value,
      fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
      tci.estamp_info_id,
      estamp_info_name,
      estamp_info_value,
      (estamp_info_value ||' '||estamp_info_unit)::interval AS estamp_info_interval,
      tci.estamp_info_by,
      (employee_center_code) AS estamp_info_by_emp_code,
      (employee_center_firstname ||' '||employee_center_lastname) AS estamp_info_by_emp_name,
      tci.estamp_info_data->0->>'card_name' AS card_name,
      tci.estamp_info_data->0->>'card_remark' AS estamp_card_remark,
      tci.estamp_info_data->0->>'company_id' AS company_id,
      mcvc.company_name,
      tci.estamp_info_data->0->>'division_id' AS division_id,
      mcvd.division_name
      FROM 
      t_carparking_info tci 
      LEFT JOIN 
      mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
      LEFT JOIN 
      mcv_employee_center mcvec ON tci.estamp_info_by = mcvec.employee_center_id 
      LEFT JOIN
      mcv_company mcvc ON (tci.estamp_info_data->0->>'company_id')::integer = mcvc.company_id
      LEFT JOIN
      mcv_division mcvd ON (tci.estamp_info_data->0->>'division_id')::integer = mcvd.division_id 
      
      WHERE 
      tci.card_type_id in(1,2) AND
      tci.tci_status = 'Y' AND
      tci.estamp_info_status = true  AND
      tci.carparking_in_time BETWEEN 
      (SELECT input_time_to FROM input_data) AND (SELECT input_time_from FROM input_data)
      
      
    )
    SELECT 
    *,
    (
            CASE WHEN carparking_time_interval_value <= (SELECT input_case_free_over_time FROM input_data) THEN
            true
            ELSE
            false
            END
    )
    AS is_less_time_than_free_parking,
  to_char(
	CASE WHEN 
	(carparking_time_interval_value - estamp_info_interval) > '00:00:00'::interval THEN 
  fun_parking_interval_difference(carparking_time_interval_value,estamp_info_interval)  
	ELSE
	'00:00:00'::interval
	END
  ,'HH24:MI:SS') AS over_estamp_value,
    EXTRACT( DAY FROM carparking_time_interval_value) AS parking_interval_day_text,
    EXTRACT( HOUR FROM carparking_time_interval_value) AS parking_interval_hour_text,
    EXTRACT( MINUTE FROM carparking_time_interval_value) AS parking_interval_minute_text
  FROM result_data 
  WHERE
  company_id::integer = (SELECT input_company_id FROM input_data)
  ORDER BY 
  carparking_in_time,
  company_id::integer,
  division_id::integer,
  estamp_info_by`,
    values: [report_start, report_end, company],
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





exports.db_action_vt_parking_estamp_visitor_history_employee = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let employee = obj.m_employee

  const query = {
    text: `WITH input_data AS(
      SELECT 
      $1::timestamp  AS input_time_to,
      $2::timestamp  AS input_time_from,
      $3::integer AS input_employee_id,
      0::integer AS input_company_id,
      0::integer AS input_division_id,
      '30 mins'::interval AS input_case_free_over_time
    ),
    result_data AS(
      SELECT  
      tci_id,
      cabinet_in_send_data->'m_card_obj'->>'card_name' AS card_name,
      license_plate_text,
      fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
      fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
      fun_get_parking_datetime_interval(carparking_in_time,carparking_out_time) AS carparking_time_interval_text,
      carparking_out_time - carparking_in_time AS carparking_time_interval_value,
      fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
      tci.estamp_info_id,
      estamp_info_name,
      estamp_info_value,
      (estamp_info_value ||' '||estamp_info_unit)::interval AS estamp_info_interval,
      tci.estamp_info_by,
      (employee_center_code) AS estamp_info_by_emp_code,
      (employee_center_firstname ||' '||employee_center_lastname) AS estamp_info_by_emp_name,
      tci.estamp_info_data->0->>'card_name' AS card_name,
      tci.estamp_info_data->0->>'card_remark' AS estamp_card_remark,
      tci.estamp_info_data->0->>'company_id' AS company_id,
      mcvc.company_name,
      tci.estamp_info_data->0->>'division_id' AS division_id,
      mcvd.division_name
      FROM 
      t_carparking_info tci 
      LEFT JOIN 
      mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
      LEFT JOIN 
      mcv_employee_center mcvec ON tci.estamp_info_by = mcvec.employee_center_id 
      LEFT JOIN
      mcv_company mcvc ON (tci.estamp_info_data->0->>'company_id')::integer = mcvc.company_id
      LEFT JOIN
      mcv_division mcvd ON (tci.estamp_info_data->0->>'division_id')::integer = mcvd.division_id 
      
      WHERE 
      tci.card_type_id in(1,2) AND
      tci.tci_status = 'Y' AND
      tci.estamp_info_status = true  AND
      tci.carparking_in_time BETWEEN 
      (SELECT input_time_to FROM input_data) AND (SELECT input_time_from FROM input_data)
      
      
    )
    SELECT 
    *,
    (
            CASE WHEN carparking_time_interval_value <= (SELECT input_case_free_over_time FROM input_data) THEN
            true
            ELSE
            false
            END
    )
    AS is_less_time_than_free_parking,
  to_char(
	CASE WHEN 
	(carparking_time_interval_value - estamp_info_interval) > '00:00:00'::interval THEN 
  fun_parking_interval_difference(carparking_time_interval_value,estamp_info_interval) 
	ELSE
	'00:00:00'::interval
	END
  ,'HH24:MI:SS') AS over_estamp_value,
  EXTRACT( DAY FROM carparking_time_interval_value) AS parking_interval_day_text,
  EXTRACT( HOUR FROM carparking_time_interval_value) AS parking_interval_hour_text,
  EXTRACT( MINUTE FROM carparking_time_interval_value) AS parking_interval_minute_text
  FROM result_data 
  WHERE
  estamp_info_by = (SELECT input_employee_id FROM input_data)
  ORDER BY 
  carparking_in_time,
  company_id::integer,
  division_id::integer,
  estamp_info_by`,
    values: [report_start, report_end, employee],
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






exports.db_action_vt_parking_estamp_visitor_history_division = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let division = obj.m_division

  const query = {
    text: `WITH input_data AS(
      SELECT 
      $1::timestamp  AS input_time_to,
      $2::timestamp  AS input_time_from,
      0::integer AS input_employee_id,
      0::integer AS input_company_id,
      $3::integer AS input_division_id,
      '30 mins'::interval AS input_case_free_over_time
    ),
    result_data AS(
      SELECT  
      tci_id,
      cabinet_in_send_data->'m_card_obj'->>'card_name' AS card_name,
      license_plate_text,
      fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
      fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
      fun_get_parking_datetime_interval(carparking_in_time,carparking_out_time) AS carparking_time_interval_text,
      carparking_out_time - carparking_in_time AS carparking_time_interval_value,
      fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
      tci.estamp_info_id,
      estamp_info_name,
      estamp_info_value,
      (estamp_info_value ||' '||estamp_info_unit)::interval AS estamp_info_interval,
      tci.estamp_info_by,
      (employee_center_code) AS estamp_info_by_emp_code,
      (employee_center_firstname ||' '||employee_center_lastname) AS estamp_info_by_emp_name,
      tci.estamp_info_data->0->>'card_name' AS card_name,
      tci.estamp_info_data->0->>'card_remark' AS estamp_card_remark,
      tci.estamp_info_data->0->>'company_id' AS company_id,
      mcvc.company_name,
      tci.estamp_info_data->0->>'division_id' AS division_id,
      mcvd.division_name
      FROM 
      t_carparking_info tci 
      LEFT JOIN 
      mv_estamp_info mvei ON tci.estamp_info_id = mvei.estamp_info_id 
      LEFT JOIN 
      mcv_employee_center mcvec ON tci.estamp_info_by = mcvec.employee_center_id 
      LEFT JOIN
      mcv_company mcvc ON (tci.estamp_info_data->0->>'company_id')::integer = mcvc.company_id
      LEFT JOIN
      mcv_division mcvd ON (tci.estamp_info_data->0->>'division_id')::integer = mcvd.division_id 
      
      WHERE 
      tci.card_type_id in(1,2) AND
      tci.tci_status = 'Y' AND
      tci.estamp_info_status = true  AND
      tci.carparking_in_time BETWEEN 
      (SELECT input_time_to FROM input_data) AND (SELECT input_time_from FROM input_data)
      
      
    )
    SELECT 
    *,
    (
            CASE WHEN carparking_time_interval_value <= (SELECT input_case_free_over_time FROM input_data) THEN
            true
            ELSE
            false
            END
    )
    AS is_less_time_than_free_parking,
    to_char(
            CASE WHEN 
            (carparking_time_interval_value - estamp_info_interval) > '00:00:00'::interval THEN 
            fun_parking_interval_difference(carparking_time_interval_value,estamp_info_interval) 
            ELSE
            '00:00:00'::interval
            END
    ,'HH24:MI:SS') AS over_estamp_value,
    EXTRACT( DAY FROM carparking_time_interval_value) AS parking_interval_day_text,
    EXTRACT( HOUR FROM carparking_time_interval_value) AS parking_interval_hour_text,
    EXTRACT( MINUTE FROM carparking_time_interval_value) AS parking_interval_minute_text
    FROM result_data 
    WHERE
    division_id::integer = (SELECT input_division_id FROM input_data)
    ORDER BY 
    carparking_in_time,
    company_id::integer,
    division_id::integer,
    estamp_info_by`,
    values: [report_start, report_end, division],
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







exports.db_action_vt_parking_payment_visitor_info_all_cabinet_car_or_motorcycle = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let card_status = obj.m_card_status





  const query = {
    text: `SELECT 
    tcpi_id,
    cabinet_payment_code,
    cabinet_payment_name,
    payment_type_name_th AS payment_type_name,
    receipt_no,
    card_code,
    card_signature,
    license_plate_text,
    car_type_status,
    fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
    cabinet_in_name,
    fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
    cabinet_out_name,
    carparking_interval,
    vppvi.estamp_info_id,
    vppvi.estamp_info_name,
    fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
    estamp_info_by,
    employee_center_code AS estamp_info_by_code,
    (employee_firstname_estamp||' '||employee_center_code) AS estamp_employee_name,
    company_name AS company_name_estamp,
    division_name AS division_name_estamp,
    fun_parking_datetime_format(payment_time) AS payment_time,
    payment_fee_amount,
    payment_vat,
    payment_fine_amount,
    payment_fine_vat,
    payment_total,
    cabinet_payment_data ->> 'ref1' as ref1,
    cabinet_payment_data ->> 'ref2' as ref2,
    create_emp_fullname as pos_emp_fullname,
    (SELECT sps_json_data->>'domain_get_img' AS domain_get_img  FROM m_system_parking_setup WHERE sps_id = 28 ),
    cabinet_in_send_data->>'m_location_car_picture' as location_car_picture_in,
    cabinet_in_send_data->>'m_location_user_picture' as location_user_picture_in,
    cabinet_out_send_data->>'m_location_car_picture' as location_car_picture_out,
    cabinet_out_send_data->>'m_location_user_picture' as location_user_picture_out
    FROM 
    vt_parking_payment_visitor_info vppvi 
    WHERE 
    vppvi.cabinet_payment_id in(7,8,9,10,11,12,13,18,19,20) AND 
    payment_type_id NOT IN(1)   AND 
    card_status = $3 AND
    payment_time BETWEEN $1::timestamp AND $2::timestamp
    ORDER BY payment_type_id,payment_time,receipt_running_number
  `,
    values: [report_start, report_end, card_status],
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





exports.db_action_vt_parking_payment_visitor_info_by_id_cabinet_car_or_motorcycle = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let cabinet_payment_id = obj.m_cabinet_payment_id
  let card_status = obj.m_card_status



  const query = {
    text: `SELECT 
      tcpi_id,
      cabinet_payment_code,
      cabinet_payment_name,
      payment_type_name_th AS payment_type_name,
      receipt_no,
      card_code,
      card_signature,
      license_plate_text,
      car_type_status,
      fun_parking_datetime_format(carparking_in_time) AS carparking_in_time,
      cabinet_in_name,
      fun_parking_datetime_format(carparking_out_time) AS carparking_out_time,
      cabinet_out_name,
      carparking_interval,
      vppvi.estamp_info_id,
      vppvi.estamp_info_name,
      fun_parking_datetime_format(estamp_info_time) AS estamp_info_time,
      estamp_info_by,
      employee_center_code AS estamp_info_by_code,
      (employee_firstname_estamp||' '||employee_center_code) AS estamp_employee_name,
      company_name AS company_name_estamp,
      division_name AS division_name_estamp,
      fun_parking_datetime_format(payment_time) AS payment_time,
      payment_fee_amount,
      payment_vat,
      payment_fine_amount,
      payment_fine_vat,
      payment_total,
      cabinet_payment_data ->> 'ref1' as ref1,
      cabinet_payment_data ->> 'ref2' as ref2,
      create_emp_fullname as pos_emp_fullname,
      (SELECT sps_json_data->>'domain_get_img' AS domain_get_img  FROM m_system_parking_setup WHERE sps_id = 28 ),
      cabinet_in_send_data->>'m_location_car_picture' as location_car_picture_in,
      cabinet_in_send_data->>'m_location_user_picture' as location_user_picture_in,
      cabinet_out_send_data->>'m_location_car_picture' as location_car_picture_out,
      cabinet_out_send_data->>'m_location_user_picture' as location_user_picture_out
      FROM 
      vt_parking_payment_visitor_info vppvi 
      WHERE 
      vppvi.cabinet_payment_id =  $3 AND 
      payment_type_id NOT IN(1)   AND
      card_status = $4 AND
      payment_time BETWEEN $1::timestamp AND $2::timestamp
      ORDER BY payment_type_id,payment_time,receipt_running_number
    `,
    values: [report_start, report_end, cabinet_payment_id, card_status],
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







exports.db_action_vt_parking_payment_visitor_min_max_receipt_car_or_motorcycle = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end
  let card_status = obj.m_card_status


  const query = {
    text: `SELECT 
    cabinet_payment_id,
    cabinet_payment_code,
    cabinet_payment_tax_code,
    cabinet_payment_name,
    to_char(payment_time,'DD/MM/YYYY') AS payment_time,
    payment_type_code,
    payment_type_name_th,
    payment_event_code,
    payment_event_name_th,
    card_type_id,
    car_type_status,
    receipt_code,
    to_char(MIN(receipt_running_number),'00000') AS min_receipt_no,
    to_char(MAX(receipt_running_number),'00000') AS max_receipt_no,
    SUM(payment_fee_amount) AS sum_payment_fee_amount,
    SUM(payment_vat) AS sum_payment_vat,
    SUM(payment_fine_amount) AS sum_payment_fine_amount,
    SUM(payment_fine_vat) AS sum_payment_fine_vat
    FROM 
    vt_parking_payment_visitor_info 
    WHERE 
    payment_time::DATE BETWEEN $1::timestamp AND $2::timestamp AND
    card_status = $3
    GROUP BY 
    cabinet_payment_id,
    cabinet_payment_code,
    cabinet_payment_tax_code,
    cabinet_payment_name,
    to_char(payment_time,'DD/MM/YYYY'),
    payment_type_id,
    payment_type_code,
    payment_type_name_th,
    payment_event_id,
    payment_event_code,
    payment_event_name_th,
    card_type_id,
    car_type_status,
    receipt_code
    ORDER BY 
    cabinet_payment_id,card_type_id,payment_type_id,payment_event_id
  `,
    values: [report_start, report_end, card_status],
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
