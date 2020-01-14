const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

module.exports = mysql.createConnection({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '', // Whoever uses an empty password for root...
  database: process.env.MYSQL_DATABASE || 'ekvv-webapp',
});
