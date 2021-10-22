import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config()


const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: "mysql"
})

export default db




