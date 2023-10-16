import mysql from "mysql2";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejs1",
});
const connection = pool.promise();
export default connection;
