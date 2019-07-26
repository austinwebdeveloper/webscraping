var mysql = require("mysql");
const async = require("async");

var connection = mysql.createConnection({
  connectionLimit: 100,
  host: "152.44.37.131",
  port: 3306,
  user: "ingramt_db_user",
  password: "GbNwzzc2RTyQ=N7-SIOe_52IoC*XEecQ",
  database: "ingramt_db"
});
console.log("connection", connection);

export { connection };
