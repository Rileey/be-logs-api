import express from 'express';
import db from './connection.js';


const app = express();

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

const port = process.env.PORT || 8080

// Schedule tasks to be run on the server.
// cron.schedule('* * * * *', function() {
//     console.log('running a task every minute');
// });

app.get("/", async (req, res) => {
    res.json({ status: "We are live and ready to go"});
});

app.get("/api/activelogs", async (req, res) => {
    db.query(`SELECT * FROM Logs where created_at > now() - interval 40 Minute`, (err, result) => {
        // `select * from accounts where date_added < now() - interval '15 Mins'`
        if ( !err ){
            res.send(result);
        } else {
            console.log(err.message);
        }
        db.end;
    })
})

app.get("/api/archivedlogs", async (req, res) => {
    db.query(`SELECT * FROM Logs where created_at < now() - interval 40 Minute`, (err, result) => {
        // `select * from accounts where date_added < now() - interval '15 Mins'`
        if ( !err ){
            res.send(result);
        } else {
            console.log(err.message);
        }
        db.end;
    })
})


app.get("/api/expiredlogs", async (req, res) => {
    db.query(`SELECT * FROM Logs where created_at < now() - interval 60 Minute`, (err, result) => {
        // `select * from accounts where date_added < now() - interval '15 Mins'`
        if ( !err ){
            res.send(result);
        } else {
            console.log(err.message);
        }
        db.end;
    })
})


    // db.query(`DELETE FROM Logs where created_at < now() - interval 65 Minute`)

app.listen(port, () => {
    console.log(`Server listening to port http://localhost:${8080}`);
});

db.connect((err) => {
    if (err){
        console.log(err);
    }
    console.log('MySQL is connected...')
});