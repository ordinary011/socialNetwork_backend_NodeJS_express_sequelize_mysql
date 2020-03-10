// SQL2 CONNECT =======================================================================

let mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'social',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

module.exports = pool;
