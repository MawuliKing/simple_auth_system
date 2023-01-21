const mysql = require('mysql');


const dbconn = mysql.createConnection({
    host: 'db4free.net',
    password: 'Mawuli098',
    user: 'mawuli',
    database: 'mawuli_test_db',
    multipleStatements: true
});


module.exports = dbconn;