const mariadb = require("mariadb");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mariadb.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MariaDB connection
connection.getConnection()
    .then(conn => {
      console.log("ok connection")
    }).catch(err => {
      console.log("error connection")
});

module.exports = connection;

