import cron from 'node-cron'
import express from 'express';
import db from './connection.js';


const app = express();

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

const port = process.env.PORT || 8080


//root directory

app.get("/", async (req, res) => {
    res.json({ status: "We are live and ready to go"});
});


//Query to create Logs table.

// app.get("/logs", (req, res) => {
//     const sql= `CREATE TABLE Logs (id int auto_increment primary key, email varchar (255) not null, msisdn bigint not null, created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp on update current_timestamp);`
//     db.query(sql, (err, results) => {
//         if ( !err ){
//             console.log(results);
//             res.send("Logs table has been created...")
//         } else {
//             throw err;
//         }
//         db.end;
//     })
// })


// Query to create messages table

app.get("/messages", (req, res) => {
    const sql = `CREATE TABLE messages (id INT PRIMARY KEY AUTO_INCREMENT, message VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL)`
    db.query(sql, (err, results) => {
        if ( !err ){
            console.log(results);
            res.send("messages table has been created...")
        } else {
            throw err;
        }
        db.end;
    })
})


// Activelogs url shows data less than six months in the database

app.get("/activelogs", async (req, res) => {
    db.query(`SELECT * FROM Logs where created_at > now() - interval 6 Month`, (err, result) => {
        if ( !err ){
            res.send(result);
        } else {
            throw err;
        }
        db.end;
    })
})

// Archivedlogs url shows data more than six months in the database

app.get("/archivedlogs", async (req, res) => {
    db.query(`SELECT * FROM Logs where created_at = now() - interval 183 Day`, (err, result) => {
        if ( !err ){
            res.send(result);
        } else {
            throw err;
        }
        db.end;
    })
})

// Expiringlogs url shows data more than six months and a week in the database

app.get("/expiringlogs", async (req, res) => {
    db.query(`SELECT * FROM Logs where created_at < now() - interval 190 Day`, (err, result) => {
        if ( !err ){
            res.send(result);
        } else {
            throw err;
        }
        db.end;
    })

    cron.schedule('0 0 7 * *', function() {
        db.query(`DELETE FROM Logs where created_at < now() - interval 190 Day`, (err, result) => {
            if ( !err ){
                res.send(result);
            } else {
                throw err;
            }
            db.end;
        })  
    })
})


//    --------------Script for permanently deleting data older than 6 months and a week------------
//     db.query(`DELETE FROM Logs where created_at < now() - interval 191 Day`)  



app.listen(port, () => {
    console.log(`Server listening to port http://localhost:${8080}`);
});

db.connect((err) => {
    if (err){
        console.log(err);
    }
    console.log('MySQL is connected...')
});