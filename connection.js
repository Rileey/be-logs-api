import mysql from 'mysql2';

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "R1leythehuman",
    database: "mysql"
})

export default db




