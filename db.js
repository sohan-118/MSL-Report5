const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie_info"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed!");
        console.log(err.message);
    } else {
        console.log("✅ MySQL Database Connected!");
    }
});

module.exports = db;