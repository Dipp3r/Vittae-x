const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const app = express()
const path = require('path')
const cors = require("cors");



const Pool = require('pg').Pool
const pool = new Pool({
    user:"postgres",
    password:"0000",
    host:"localhost",
    post:5432,
    database:"db"
});
const port = 3000;
const cookieTime = 1000*60*60*24*10

//middleware
app.use(cors());


app.use(express.static(path.join(__dirname,'/', "build")));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(sessions({
    secret:"thisIsASceret",
    saveUninitialized:true,
    cookie:{maxAge:cookieTime},
    resave:false
}))

function getRandomId(len){
    return Number.parseInt((new Array(len).fill(Math.round((Math.random()*10)))).join(""))
}
let session;
app.post('/signIn',async(req,res)=>{
    session = req.session
    try {
        const obj = req.body;
        let count=0;
        console.log(obj)
        switch(obj.typeId){
            case 0:
                // email
                try {
                    const User = await pool.query("SELECT userid FROM temp_users WHERE email = $1 AND password = $2",[obj.type,obj.password]);
                    count = User.rowCount;
                    session.userId = User.rows[0].userid
                } catch (err) {
                    console.error(err.message);
                }

                break
            case 1:
                // phone
                try {
                    const User = await pool.query("SELECT userid FROM temp_users WHERE mobile = $1 AND password = $2",[obj.type,obj.password]);
                    count = User.rowCount;
                    session.userId = User.rows[0].userid; 
                    // console.log(User)
                } catch (err) {
                    console.error(err.message);
                }
                break
        }
        
        if (count>0){
            res.json({status:true});
        }
        else{
            res.json({status:false});
        }
    } catch (err) {
        console.error(err.message);
    }
    // console.log(req.body)
    // res.send({'status':true})
    console.log(session)
})
app.get('/signIn',async(req,res)=>{
    console.log(req.session)
    let status = false
    if(req.session.userId > 0){
        status = true
    }else{
        status = false
    }
    res.send({status:status})
} )
app.post('/signUp',async(req,res)=>{
    console.log(req.body)
    try {
        let {name,mail,mobile,password } = req.body;
        mobile = Number.parseInt(mobile)
        let userId = getRandomId(6)
        const newUser = await pool.query("INSERT INTO temp_users(userId,name,email,mobile,password) VALUES($1,$2,$3,$4,$5)",[userId,name,mail,mobile,password])
        res.send({'status':(newUser.rowCount > 0)})
    } catch (err) {
        console.error(err.message);
        res.send({'status':false})
    }
    // console.log(req.body)
    // res.send({'status':true})
})

app.post('/verifyID',(req,res)=>{
    console.log(req.body)
    res.send({'status':true})
})
app.post('/sendOTP',(req,res)=>{
    console.log(req.body)
    let status = false
    if(req.body.OTP == '1234'){
        status = true
    }
    res.send({'status':status})
})
app.post('/setNewPassword',(req,res)=>{
    console.log(req.body)
    res.send({'status':true})
})

app.listen(port,(err)=>{
    console.log(`server : http://localhost:${port}`)
    if (err) console.log(err)
})