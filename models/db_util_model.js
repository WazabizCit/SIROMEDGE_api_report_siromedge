
const pool = require("../config/db_con");



exports.db_action_get_employee = function (obj, callback) {

  
  let division_id = obj.m_division_id



  const query = {
    text: `SELECT 
    employee_center_id,employee_center_code,employee_center_firstname,employee_center_lastname,mcvec.division_id,mcvec.company_id,mcvc.company_name,mcvd.division_name as division_name
      FROM
      mcv_employee_center mcvec
    LEFT JOIN mcv_division mcvd
      ON mcvec.division_id = mcvd.division_id
    LEFT JOIN mcv_company mcvc
      ON mcvec.company_id = mcvc.company_id
      WHERE
      mcvec.division_id = $1`,
    values: [division_id],
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


exports.db_action_get_division = function (obj, callback) {


  let company_id = obj.m_company_id

  
  const query = {
    text: `
    SELECT 
    division_id,division_name
    FROM 
    mcv_division
    WHERE
    company_id = $1 order by 1 asc`,
    values: [company_id],
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



exports.db_action_get_all_company = function (obj, callback) {
  
  const query = {
    text: `SELECT 
    company_id,company_name
    FROM
    mcv_company order by 1 asc`,
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





exports.db_action_get_all_cabinet_type = function (obj, callback) {


  
  const query = {
    text: `SELECT 
    cabinet_id,
    cabinet_code,
    cabinet_name
    FROM 
    m_cabinet 
    WHERE 
    cabinet_status in('WEB_PAYMENT','PAYMENT')
    ORDER BY 1`,
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



exports.db_cabinet_status = function (obj, callback) {

  let cabinet_ip_address = obj.cabinet_ipaddress_real




  const query = {
    text: `   
 SELECT 
 cabinet_id,
 cabinet_tax_code,
 cabinet_name,
 mc.cabinet_type_id,
 mct.cabinet_type_name,
 cabinet_status,
 cabinet_code,
 building_code,
 building_name,
 reg_no as registered_no,
 mb.registered_no as building_tax,
 cabinet_ip_address
 FROM m_cabinet mc 
 JOIN m_building mb ON mc.building_id = mb.building_id 
 JOIN m_cabinet_type mct ON mc.cabinet_type_id = mct.cabinet_type_id 
   WHERE mc.delete_flag = 'N' AND cabinet_ip_address = $1`,
    values: [cabinet_ip_address],
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



