const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var ip = require('ip');
const config = require("./config/env");
const pool = require("./config/db_con");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(config.main_config.PORT, () => {
    console.log(ip.address() + " Ver.1.0.0 =>" + 'Start server at port ' + config.main_config.PORT)
})





// // //Report
const actionreports_visitor = require('./routes/action_reports_visitor_route');
const actionreports_analyst = require('./routes/action_reports_analyst_route');








// // //Report
app.use('/apipos/actionreports/visitor', actionreports_visitor);
app.use('/apipos/actionreports/analyst', actionreports_analyst);







app.get('/test', (req, res) => {
    res.send({
        "status": "success connect",
    })
})




pool.connect().then(client => {
    return client.query('SELECT NOW()')
        .then(result => {
            client.release()
            console.log("connect database  success ")
        })
        .catch(err => {
            client.release()
            return console.error('Error executing query', err.stack)
        })
})

