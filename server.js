const express = require('express');
const app = express()
const path = require('path')
const port = 2000;


app.use(express.static(path.join(__dirname,'/', "build")));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

function checkMobilOrMail(str){
    str = str.trim();
    if (str[0] == '+'){
        //removing +91 from the number
        str = str.slice(3,)
        
    }
    if(/^[0-9]+$/ig.test(str)){
        console.log('digits')
        if(str.length == 10){
            console.log('its a number')
        }
    }else{
        console.log('mailID')
    }
    console.log(str)
    console.log('\n')
}
// checkMobilOrMail('+911234567890')
// checkMobilOrMail('j1234567890')
// checkMobilOrMail('sample@mail.com')

app.post('/signIn',(req,res)=>{
    console.log(req.body)
    res.send({'status':true})
})

app.post('/signUp',(req,res)=>{
    console.log(req.body)
    res.send({'status':true})
})

app.post('/verifyID',(req,res)=>{
    console.log(req.body)
    res.send({'status':true})
})
app.post('/sendOTP',(req,res)=>{
    console.log(req.body)
    res.send({'status':true})
})
app.post('/setNewPassword',(req,res)=>{
    console.log(req.body)
    res.send({'status':true})
})

app.listen(port,(err)=>{
    console.log(`server : http://localhost:${port}`)
    if (err) console.log(err)
})