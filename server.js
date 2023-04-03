const express = require('express');
// const sessions = require('express-session');
// const cookieParser = require('cookie-parser');
const app = express()
const path = require('path')
const cors = require("cors");



const Pool = require('pg').Pool
const pool = new Pool({
    user:"vittaex",
    password:"123456",
    host:"localhost",
    post:5432,
    database:"vittaex"
});
const port = 3000;
// const cookieTime = 1000*60*60*24*10

// //middleware
app.use(cors());


app.use(express.static(path.join(__dirname,'/', "build")));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cookieParser())

// app.use(sessions({
//     secret:"thisIsASceret",
//     saveUninitialized:true,
//     cookie:{maxAge:cookieTime},
//     resave:false
// }))

function getRandomId(len){
    return Number.parseInt((new Array(len).fill(Math.round((Math.random()*10)))).join(""))
}

app.post('/getNotesList',async(req,res)=>{
    console.log(req.body)
    try {
        let data = req.body;
        let notes = await pool.query(`select id,title,body,date from notes where customer_id = ${data.customer_id} and broker_id = ${data.broker_id}`)
        res.send(notes.rows)
    } catch (err) {
        console.error(err.message);
        res.send([])
    }
})
app.post('/addNote',(req,res)=>{
    console.log(req.body)
    let data = req.body
    try{
        let query = pool.query(`insert into notes (id,customer_id,broker_id,title,body,date) values (${data.id},${data.customer_id},${data.broker_id},'${data.title}','${data.body}','${data.date}')`)
        console.log(query)
    }catch (err) {
        console.error(err.message);
    }
    res.send()
})
app.get('*',(req,res)=>{
    console.log(req.body)
    res.sendFile(path.join(__dirname,'/', "build","index.html"))
} )



app.listen(port,(err)=>{
    console.log(`server : http://localhost:${port}`)
    if (err) console.log(err)
})