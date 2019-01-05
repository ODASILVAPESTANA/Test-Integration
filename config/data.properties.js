// conexión a la BD MySql
const mysql = require("mysql");

module.exports = () => {
  return mysql.createConnection({
    host: "db4free.net",
    user: "sql9144354",
    password: "7TW2ccREF1",
    database: "prueba_admision"
  });
}

