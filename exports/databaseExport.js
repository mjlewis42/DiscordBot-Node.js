var mysql =require('mysql');

var leagueteams  = mysql.createPool({
    connectionLimit :15,
    host            :[REDACTED],
    user            :[REDACTED],
    password        :[REDACTED],
    database        :[REDACTED]
});

module.exports = {leagueteams};