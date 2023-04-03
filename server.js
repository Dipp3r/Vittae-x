const express = require('express');
// const sessions = require('express-session');
// const cookieParser = require('cookie-parser');
const app = express()
const path = require('path')
const cors = require("cors");
const { kMaxLength } = require('buffer');



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
app.post('/getTasksList',async(req,res)=>{
    console.log(req.body)
    try {
        let data = req.body;
        let notes = await pool.query(`select * from tasks where customer_id = ${data.customer_id} and broker_id = ${data.broker_id}`)
        res.send(notes.rows)
    } catch (err) {
        console.error(err.message);
        res.send([])
    }
})
app.post('/addtask',(req,res)=>{
    console.log(req.body)
    let data = req.body
    try{
        let query = pool.query(`insert into tasks (id,customer_id,broker_id,title,body,date,completed) values (${data.id},${data.customer_id},${data.broker_id},'${data.title}','${data.discription}','${data.date}',false)`)
        console.log(query)
    }catch (err) {
        console.error(err.message);
    }
    res.send()
})
app.post("/getTasksForMonth",async (req,res)=>{
    let data = req.body
    try{
        let tasks = await pool.query(`SELECT * FROM tasks WHERE broker_id = ${data.broker_id} and date BETWEEN DATE_TRUNC('month', '${data.date}'::timestamp) AND DATE_TRUNC('month', '${data.date}'::timestamp) + INTERVAL '1 month' - INTERVAL '1 millisecond';`)
        // console.log(tasks)
        console.log(tasks.rows)
        let [day,month,year] = data.date.split("-");
        data.date = new Date(`${year}-${month}-${day}`)
        console.log(data.date)
        let tempdata = tasks.rows
        let maxLength = tempdata.length
        let arr = []
        for(let dt = new Date(data.date.getFullYear(),data.date.getMonth(),1);dt< new Date(data.date.getFullYear(),data.date.getMonth()+1,0);dt.setDate(dt.getDate()+1)){
            // console.log(dt)
            let obj = {}
            obj.date = new Date(dt)
            obj.tasks = []
            // console.log(dt,tempdata.length)
            for(let i = 0;i<maxLength;i++){
                let date2 = new Date(tempdata[i].date)
                // console.log(dt.getDate(), date2.getDate() , dt.getMonth() ,date2.getMonth(), dt.getFullYear(), date2.getFullYear())
                if(dt.getDate() == date2.getDate() && dt.getMonth() == date2.getMonth() && dt.getFullYear() == date2.getFullYear()){
                    // console.log(`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`)
                    obj.date = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`
                    tempdata[i].due = Math.ceil((new Date() - date2)/(1000 * 60 * 60 * 24))-1
                    tempdata[i].due = tempdata[i].due >= 0? null:-1 * tempdata[i].due;
                    obj.tasks.push(tempdata[i])
                    tempdata.splice(i,1)
                    maxLength-=1
                }
                // console.log(dt.toDateString(),new Date(tempdata[i].date).toDateString(),dt.toDateString()==new Date(tempdata[i].date).toDateString(),i)
            }

            // console.log(obj.date.toDateString(),obj.tasks.length)
            if (obj.tasks.length > 0) arr.push({...obj})
        }
        console.log(arr)
        res.send(arr)
    }catch (err) {
        console.error(err.message);
        res.send([])
    }
    
})
app.get('*',(req,res)=>{
    console.log(req.body)
    res.sendFile(path.join(__dirname,'/', "build","index.html"))
} )



app.listen(port,(err)=>{
    console.log(`server : http://localhost:${port}`)
    if (err) console.log(err)
})