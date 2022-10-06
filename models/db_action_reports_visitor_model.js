

const pool = require("../config/db_con");




exports.db_action_vt_parking_in_visitor_info = function (obj, callback) {

    let report_start = obj.m_report_start
    let report_end = obj.m_report_end
    let cabinet_payment_id = obj.m_cabinet_payment_id
  
    const query = {
      text: ``,
      values: [],
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
      0::integer AS input_division_id
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
      tci.card_type_id = 1 AND
      tci.tci_status = 'Y' AND
      tci.estamp_info_status = true  AND
      tci.carparking_in_time BETWEEN 
      (SELECT input_time_to FROM input_data) AND (SELECT input_time_from FROM input_data)
      
      
    )
    SELECT 
    *,
    to_char(
      CASE WHEN 
      (carparking_time_interval_value - estamp_info_interval) > '00:00:00'::interval THEN 
      carparking_time_interval_value - estamp_info_interval 
      ELSE
      '00:00:00'::interval
      END
    ,'HH24:MI:SS') AS over_estamp_value
    FROM result_data 
    ORDER BY 
    carparking_in_time,
    company_id::integer,
    division_id::integer,
    estamp_info_by`,
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
      0::integer AS input_division_id
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
      tci.card_type_id = 1 AND
      tci.tci_status = 'Y' AND
      tci.estamp_info_status = true  AND
      tci.carparking_in_time BETWEEN 
      (SELECT input_time_to FROM input_data) AND (SELECT input_time_from FROM input_data)
      
      
    )
    SELECT 
*,
  to_char(
	CASE WHEN 
	(carparking_time_interval_value - estamp_info_interval) > '00:00:00'::interval THEN 
	carparking_time_interval_value - estamp_info_interval 
	ELSE
	'00:00:00'::interval
	END
  ,'HH24:MI:SS') AS over_estamp_value
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
      $3::integer AS input_division_id
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
      tci.card_type_id = 1 AND
      tci.tci_status = 'Y' AND
      tci.estamp_info_status = true  AND
      tci.carparking_in_time BETWEEN 
      (SELECT input_time_to FROM input_data) AND (SELECT input_time_from FROM input_data)
      
      
    )
    SELECT 
    *,
    to_char(
            CASE WHEN 
            (carparking_time_interval_value - estamp_info_interval) > '00:00:00'::interval THEN 
            carparking_time_interval_value - estamp_info_interval 
            ELSE
            '00:00:00'::interval
            END
    ,'HH24:MI:SS') AS over_estamp_value
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



