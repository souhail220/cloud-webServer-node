const mysql = require("mysql");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const MysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST || "amen.mysql.database.azure.com",
  user: process.env.DB_USER || "Bresili",
  password: process.env.DB_PASSWORD || "sNfbXuw9mzAXM2V",
  database: process.env.DB_NAME || "student",
  ssl: {
    ca: fs.readFileSync("config/DigiCertGlobalRootCA.crt.pem"),
    rejectUnauthorized: false,
  },
});

MysqlConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

module.exports = MysqlConnection;
