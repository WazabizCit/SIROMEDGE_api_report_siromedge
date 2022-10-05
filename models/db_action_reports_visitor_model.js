

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
