
const pool = require("../config/db_con");




exports.db_action_vt_cabinet_withdraw_deposit_sub_date = function (obj, callback) {

  let report_date = obj.m_report_date
  


const query = {
  text: `WITH input_data AS(
    SELECT 
    $1::date AS input_date
  ),
  query_head AS (
    SELECT
    cwdh_id,
    cwdh_cardcode,
    cwdh_tokencode,
    fun_parking_datetime_format(cwdh_event_timestamp) AS cwdh_event_timestamp,
    fun_parking_datetime_format(cwdh_start_timestamp) AS cwdh_start_timestamp, 
    fun_parking_datetime_format(cwdh_expire_timestamp) AS cwdh_expire_timestamp,
    emp_id,
    employee_center_code AS emp_code,
    (employee_center_firstname||' '||employee_center_lastname) AS emp_full_name,
    cwdh.cabinet_id,
    cabinet_code,
    cabinet_ip_address,
    cabinet_name,
    complete_flag,
    complete_date
    FROM
    t_cabinet_withdraw_deposit_header cwdh
    LEFT JOIN 
    mcv_employee_center vec ON vec.employee_center_id = cwdh.emp_id 
    LEFT JOIN
    m_cabinet mcb ON cwdh.cabinet_id = mcb.cabinet_id
    WHERE
    complete_flag = 'Y' AND
    cwdh_event_timestamp::DATE = (SELECT input_date FROM input_data)
    ORDER BY 1
  ),
  query_sub AS(
    SELECT 
    cwds.cwdh_id,
    cwdh_cardcode,
    cwdh_tokencode,
    cwdh_event_timestamp,
    cwdh_start_timestamp,
    cwdh_expire_timestamp,
    emp_id,
    emp_code,
    emp_full_name,
    cabinet_id,
    cabinet_code,
    cabinet_ip_address,
    cabinet_name,
    cwds.cwds_id,
    line_no,
    cwds_cash_type,
    cwds_cash_amount,
    (CASE 
     WHEN cwds_cash_event = 'WAIT_DEPOSIT' THEN 'รอการฝาก' 
     WHEN cwds_cash_event = 'WITHDRAW' THEN 'ทำการถอน'
     WHEN cwds_cash_event = 'DEPOSIT' THEN 'ทำการฝาก'
     ELSE cwds_cash_event END
    )
    FROM
    t_cabinet_withdraw_deposit_sub cwds
    JOIN 
    query_head qh ON qh.cwdh_id = cwds.cwdh_id 
    ORDER BY 
    cwds.cwdh_id,
    cwds.cwds_id
  )
  SELECT * FROM query_sub
  
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



