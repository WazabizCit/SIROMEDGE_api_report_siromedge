
const pool = require("../config/db_con");




exports.db_action_parking_outstanding = function (obj, callback) {

  let report_start = obj.m_report_start
  let report_end = obj.m_report_end


const query = {
  text: `
  SELECT 
  tci_id,
  'รถยนต์' AS car_type_name,
  card_status,
  (CASE 
   WHEN card_status = 'VC' THEN 
   card_signature
   WHEN card_status = 'VM' THEN 
   card_signature
   WHEN card_status = 'MC' THEN 
   cabinet_in_send_data->'m_detail_memberexclusive'->>'employee_id'
   WHEN card_status = 'MM' THEN 
   cabinet_in_send_data->'m_detail_memberexclusive'->>'employee_id'
   WHEN card_status = 'BKC' THEN 
   cabinet_in_send_data->'m_detail_memberexclusive'->>'invite_code'
   ELSE
   'NOT_DATA'
   END
  ) AS card_name,
  license_plate_text,
  fun_parking_datetime_format(carparking_in_time) AS carparking_in_time
  FROM t_carparking_info 
  WHERE tci_status = 'N' AND 
  carparking_in_time::timestamp between $1::timestamp AND $2::timestamp
  ORDER BY card_type_id,carparking_in_time`,
  values: [report_start,report_end],
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




exports.db_action_vt_parking_analyst_date_in = function (obj, callback) {

    let report_date = obj.m_report_date
  

  
  const query = {
    text: `WITH input_data AS(
        SELECT 
        $1::date AS search_date
),
gen_time AS(
        SELECT generate_series(0,23) AS gen_time_value
),
result_data AS (
        SELECT  
        to_char(carparking_in_time,'HH24')::integer AS time_value,
        COUNT(*) AS count_amount,
        COUNT(*) FILTER (WHERE card_type_id = 1) AS count_vc_amount,
        COUNT(*) FILTER (WHERE card_type_id = 2) AS count_vm_amount,
        COUNT(*) FILTER (WHERE card_type_id = 3) AS count_mc_amount,
        COUNT(*) FILTER (WHERE card_type_id = 4) AS count_mm_amount,
        COUNT(*) FILTER (WHERE card_type_id = 5) AS count_bkc_amount
        FROM t_carparking_info 
        WHERE 
        carparking_in_time::date = (SELECT search_date FROM input_data)
        GROUP BY  
        to_char(carparking_in_time,'HH24')::integer
        ORDER BY 1
)
SELECT 
to_char(gen_time_value,'00')||':00:00' AS time_text,
COALESCE(count_amount,0) AS count_amount,
COALESCE(count_vc_amount,0) AS count_vc_amount,
COALESCE(count_vm_amount,0) AS count_vm_amount,
COALESCE(count_mc_amount,0) AS count_mc_amount,
COALESCE(count_mm_amount,0) AS count_mm_amount
FROM 
gen_time gt 
LEFT JOIN 
result_data rd ON gt.gen_time_value = rd.time_value 
ORDER BY gen_time_value
`,
    values: [report_date],
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








exports.db_action_vt_parking_analyst_date_out = function (obj, callback) {

    let report_date = obj.m_report_date
  

  
  const query = {
    text: `WITH input_data AS(
        SELECT 
        $1::date AS search_date
),
gen_time AS(
        SELECT generate_series(0,23) AS gen_time_value
),
result_data AS (
        SELECT  
        to_char(carparking_out_time,'HH24')::integer AS time_value,
        COUNT(*) AS count_amount,
        COUNT(*) FILTER (WHERE card_type_id = 1) AS count_vc_amount,
        COUNT(*) FILTER (WHERE card_type_id = 2) AS count_vm_amount,
        COUNT(*) FILTER (WHERE card_type_id = 3) AS count_mc_amount,
        COUNT(*) FILTER (WHERE card_type_id = 4) AS count_mm_amount,
        COUNT(*) FILTER (WHERE card_type_id = 5) AS count_bkc_amount
        FROM t_carparking_info 
        WHERE 
        carparking_out_time::date = (SELECT search_date FROM input_data)
        GROUP BY  
        to_char(carparking_out_time,'HH24')::integer
        ORDER BY 1
)
SELECT 
to_char(gen_time_value,'00')||':00:00' AS time_text,
COALESCE(count_amount,0) AS count_amount,
COALESCE(count_vc_amount,0) AS count_vc_amount,
COALESCE(count_vm_amount,0) AS count_vm_amount,
COALESCE(count_mc_amount,0) AS count_mc_amount,
COALESCE(count_mm_amount,0) AS count_mm_amount
FROM 
gen_time gt 
LEFT JOIN 
result_data rd ON gt.gen_time_value = rd.time_value 
ORDER BY gen_time_value

`,
    values: [report_date],
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





exports.db_action_vt_parking_analyst_year_month_in = function (obj, callback) {


  let report_year_month = obj.m_report_year_month


const query = {
  text: `WITH input_data AS(
    SELECT 
    $1::character varying AS search_year_month
),
gen_day AS(
    SELECT generate_series(1,
EXTRACT(DAY FROM date_trunc('month',((SELECT search_year_month FROM input_data)||'-01')::date) + interval '1 month' - interval '1 day')::integer) AS gen_date_value
),
gen_date AS (
    SELECT (SELECT search_year_month FROM input_data)||'-'||TRIM(to_char(gen_date_value,'00')) AS date_text FROM gen_day
),
result_data AS (
    SELECT  
    to_char(carparking_in_time,'YYYY-MM-DD') AS date_value,
    COUNT(*) AS count_amount,
    COUNT(*) FILTER (WHERE card_type_id = 1) AS count_vc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 2) AS count_vm_amount,
    COUNT(*) FILTER (WHERE card_type_id = 3) AS count_mc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 4) AS count_mm_amount,
    COUNT(*) FILTER (WHERE card_type_id = 5) AS count_bkc_amount
    FROM t_carparking_info 
    WHERE 
    to_char(carparking_in_time,'YYYY-MM') = (SELECT search_year_month FROM input_data)
    GROUP BY  
    to_char(carparking_in_time,'YYYY-MM-DD')
    ORDER BY to_char(carparking_in_time,'YYYY-MM-DD')::date
)
SELECT 
date_text,
COALESCE(count_amount,0) AS count_amount,
COALESCE(count_vc_amount,0) AS count_vc_amount,
COALESCE(count_vm_amount,0) AS count_vm_amount,
COALESCE(count_mc_amount,0) AS count_mc_amount,
COALESCE(count_mm_amount,0) AS count_mm_amount
FROM 
gen_date gd
LEFT JOIN 
result_data rd ON gd.date_text = rd.date_value 
ORDER BY date_text::date

`,
  values: [report_year_month],
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








exports.db_action_vt_parking_analyst_year_month_out = function (obj, callback) {


  let report_year_month = obj.m_report_year_month


const query = {
  text: `WITH input_data AS(
    SELECT 
    $1::character varying AS search_year_month
),
gen_day AS(
    SELECT generate_series(1,
     EXTRACT(DAY FROM date_trunc('month',((SELECT search_year_month FROM input_data)||'-01')::date) + interval '1 month' - interval '1 day')::integer) AS gen_date_value
),
gen_date AS (
    SELECT (SELECT search_year_month FROM input_data)||'-'||TRIM(to_char(gen_date_value,'00')) AS date_text FROM gen_day
),
result_data AS (
    SELECT  
    to_char(carparking_out_time,'YYYY-MM-DD') AS date_value,
    COUNT(*) AS count_amount,
    COUNT(*) FILTER (WHERE card_type_id = 1) AS count_vc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 2) AS count_vm_amount,
    COUNT(*) FILTER (WHERE card_type_id = 3) AS count_mc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 4) AS count_mm_amount
    FROM t_carparking_info 
    WHERE 
    to_char(carparking_out_time,'YYYY-MM') = (SELECT search_year_month FROM input_data)
    GROUP BY  
    to_char(carparking_out_time,'YYYY-MM-DD')
    ORDER BY to_char(carparking_out_time,'YYYY-MM-DD')::date
)
SELECT 
date_text,
COALESCE(count_amount,0) AS count_amount,
COALESCE(count_vc_amount,0) AS count_vc_amount,
COALESCE(count_vm_amount,0) AS count_vm_amount,
COALESCE(count_mc_amount,0) AS count_mc_amount,
COALESCE(count_mm_amount,0) AS count_mm_amount
FROM 
gen_date gd
LEFT JOIN 
result_data rd ON gd.date_text = rd.date_value 
ORDER BY date_text::date
`,
  values: [report_year_month],
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







exports.db_action_vt_parking_analyst_year_in = function (obj, callback) {


  let report_year = obj.m_report_year

const query = {
  text: `WITH input_data AS(
    SELECT 
    $1::integer AS search_year
),
gen_number AS(
    SELECT generate_series(1,12) AS gen_number_value
),
gen_year AS (
    SELECT gen_number_value,(SELECT search_year FROM input_data)||'-'||TRIM(to_char(gen_number_value,'00')) AS month_text FROM gen_number
),
result_data AS (
    SELECT  
    EXTRACT(YEAR FROM carparking_in_time) AS year_value,
    EXTRACT(MONTH FROM carparking_in_time) AS month_value,
    COUNT(*) AS count_amount,
    COUNT(*) FILTER (WHERE card_type_id = 1) AS count_vc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 2) AS count_vm_amount,
    COUNT(*) FILTER (WHERE card_type_id = 3) AS count_mc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 4) AS count_mm_amount,
    COUNT(*) FILTER (WHERE card_type_id = 5) AS count_bkc_amount
    FROM t_carparking_info 
    WHERE 
    EXTRACT(YEAR FROM carparking_in_time) = (SELECT search_year FROM input_data)
    GROUP BY  
    EXTRACT(YEAR FROM carparking_in_time),
    EXTRACT(MONTH FROM carparking_in_time)
    ORDER BY 
    EXTRACT(YEAR FROM carparking_in_time),
    EXTRACT(MONTH FROM carparking_in_time)
)
SELECT 
(SELECT search_year FROM input_data) AS year_value,
gen_number_value AS month_value,
fun_report_month_thai_text(gen_number_value) AS month_text,
COALESCE(count_amount,0) AS count_amount,
COALESCE(count_vc_amount,0) AS count_vc_amount,
COALESCE(count_vm_amount,0) AS count_vm_amount,
COALESCE(count_mc_amount,0) AS count_mc_amount,
COALESCE(count_mm_amount,0) AS count_mm_amount
FROM gen_year gy
LEFT JOIN 
result_data rd ON gy.gen_number_value = rd.month_value         
ORDER BY gen_number_value
`,
  values: [report_year],
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









exports.db_action_vt_parking_analyst_year_out = function (obj, callback) {


  let report_year = obj.m_report_year

const query = {
  text: `WITH input_data AS(
    SELECT 
    $1::integer AS search_year
),
gen_number AS(
    SELECT generate_series(1,12) AS gen_number_value
),
gen_year AS (
    SELECT gen_number_value,(SELECT search_year FROM input_data)||'-'||TRIM(to_char(gen_number_value,'00')) AS month_text FROM gen_number
),
result_data AS (
    SELECT  
    EXTRACT(YEAR FROM carparking_out_time) AS year_value,
    EXTRACT(MONTH FROM carparking_out_time) AS month_value,
    COUNT(*) AS count_amount,
    COUNT(*) FILTER (WHERE card_type_id = 1) AS count_vc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 2) AS count_vm_amount,
    COUNT(*) FILTER (WHERE card_type_id = 3) AS count_mc_amount,
    COUNT(*) FILTER (WHERE card_type_id = 4) AS count_mm_amount
    FROM t_carparking_info 
    WHERE 
    EXTRACT(YEAR FROM carparking_out_time) = (SELECT search_year FROM input_data)
    GROUP BY  
    EXTRACT(YEAR FROM carparking_out_time),
    EXTRACT(MONTH FROM carparking_out_time)
    ORDER BY 
    EXTRACT(YEAR FROM carparking_out_time),
    EXTRACT(MONTH FROM carparking_out_time)
)
SELECT 
(SELECT search_year FROM input_data) AS year_value,
gen_number_value AS month_value,
fun_report_month_thai_text(gen_number_value) AS month_text,
COALESCE(count_amount,0) AS count_amount,
COALESCE(count_vc_amount,0) AS count_vc_amount,
COALESCE(count_vm_amount,0) AS count_vm_amount,
COALESCE(count_mc_amount,0) AS count_mc_amount,
COALESCE(count_mm_amount,0) AS count_mm_amount
FROM gen_year gy
LEFT JOIN 
result_data rd ON gy.gen_number_value = rd.month_value         
ORDER BY gen_number_value
`,
  values: [report_year],
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
