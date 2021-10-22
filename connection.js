import mysql from 'mysql2';
// import pkg from 'pg';

// const { Client } = pkg;
// const client = new Client ({
//     user: 'postgres',
//     password: 'R1leythehuman',
//     port: 5432,
//     host: 'localhost',
//     database: 'test-db'
// })

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "R1leythehuman",
    database: "mysql"
})

export default db




