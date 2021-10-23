import mysql from 'mysql';
import dotenv from 'dotenv'

dotenv.config()


const db = mysql.createPool({
    connectionLimit: 100,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB,
    debug: false
})

export default db