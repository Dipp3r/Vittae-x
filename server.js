const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const app = express()
const path = require('path')
const cors = require("cors");



const Pool = require('pg').Pool
const pool = new Pool({
    user:"postgres",
    password:"prehsurath",
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
        let row = {}
        switch(obj.typeId){
            case 0:
                // email
                try {
                    const User = await pool.query("SELECT userid FROM users WHERE email = $1 AND password = $2",[obj.type,obj.password]);
                    count = User.rowCount;
                    row = User.rows[0]
                } catch (err) {
                    console.error(err.message);
                }
                break
            case 1:
                // phone
                try {
                    obj.type = obj.type.slice(-10);
                    const User = await pool.query("SELECT userid FROM users WHERE mobile = $1 AND password = $2",[obj.type,obj.password]);
                    count = User.rowCount;
                    row = User.rows[0]
                } catch (err) {
                    console.error(err.message);
                }
                break
        }
    
        if (count>0){
            if (obj.rememberMe){
                console.log("tring to store in sessions");
                console.log(row.userid);
                session.userId = row.userid;
            }
            res.send({status:true});
        }
        else{
            res.send({status:false});
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

app.post('/verifyID',async(req,res)=>{
    let type = req.body.type
    let typeId = req.body.typeId
    let obj = {status:false,msg:""}
    switch(typeId){
        case 0:
            try {
                const User = await pool.query("SELECT userid FROM users WHERE email = $1",[type]);
                if (User.rowCount>0) {
                    req.session.userId=User.rows[0].userid;
                    obj.status=true;
                }
            } catch (err) {
                obj.msg=err.message;
            }
            break
        case 1:
            try {
                type=type.slice(-10);
                const User = await pool.query("SELECT userid FROM users WHERE mobile = $1",[type]);
                if (User.rowCount>0) {
                    req.session.userId=User.rows[0].userid;
                    obj.status=true;
                }
            } catch (err) {
                obj.msg=err.message;
            }
            break
    }
    res.send(obj);
})

app.post('/sendOTP',(req,res)=>{
    console.log(req.body)
    let status = false
    if(req.body.OTP == '1234'){
        status = true
    }
    res.send({'status':status})
})

app.post('/setNewPassword',async(req,res)=>{
    const {password} = req.body
    let response =  {status:false,msg:""};
    session=req.session
    try {
        const User = await pool.query("UPDATE users SET password = $1 WHERE userid = $2",[password,session.userId]);
        if(User.rowCount>0){
            response.status = true;
        }
    } catch (err) {
        response.msg = err;
    }
    res.send(response);
})

app.listen(port,(err)=>{
    console.log(`server : http://localhost:${port}`)
    if (err) console.log(err)
})