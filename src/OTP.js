import React from "react";
import { WithRouter } from "./routingWrapper";

class OTPComp extends React.Component {
    constructor(props){
        super(props);
        this.state = {OTP:["","","",""],
        min :"01",
        sec:"00",
        intervalId:0,
        isTimeOut:false
        }
        this.changeInVal = this.changeInVal.bind(this)
        this.changeTimer = this.changeTimer.bind(this)
        this.setTime = this.setTime.bind(this)
        this.submit = this.submit.bind(this)
        this.reset = this.reset.bind(this)
        this.submitLink = 'sendOTP'
        this.loc = '../'
    }   
    changeInVal(e){
        // console.log(Number.parseInt(e.target.getAttribute('name')),e.target.value)
        var text = this.state.OTP
        var num = Number.parseInt(e.target.getAttribute('name'))
        var value = e.target.value
        var inputclass = document.body.querySelector('#inputBarContainer').children
        // // console.log(value == "",num)
        // value = Number.parseInt(value).split(-1)
        // if(!Number.isInteger(value)) return;
        if(value == '' && num >0){
            inputclass[num-1].focus()
        }
        
        
        // console.log(text,this.state.OTP)
        if(inputclass[num].value == ""){
            inputclass[num].value = value[0]
            text[num] = value[0]
        }else if (num <=2 && value.length > 1){
            inputclass[num].value = value[0]
            inputclass[num+1].value = value.slice(-1)
            text[num] = value[0]
            text[num+1] = value.slice(-1)
        }else{
            inputclass[num].value = ''
            inputclass[num].value = value.slice(-1)
            text[num] = value.slice(-1)
        }
        
        if(num<=2 && value !== ''){
            inputclass[num+1].focus()
        }
        this.setState({OTP:text})
    }
    reset(){
        var obj = {OTPFor:this.props.txt}
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((data)=>{
           if (data.status){
            this.setTime(1,6)
           }
        })
    }
    changeTimer(){
        var min = Number.parseInt(this.state.min);
        var sec = Number.parseInt(this.state.sec);
        if(min == 0 && sec == 0){
            return
        }else{
            if(sec <= 0){
                sec = 59
                min-=1
            }else{
                sec-=1
            }
            if(min < 10){
                min = `0${min}`
            }else{
                min = `${min}`
            }
            if(sec < 10){
                sec = `0${sec}`
            }else{
                sec = `${sec}`
            }
        }
        // console.log(this.state)
        this.setState({min:min,sec:sec})
    }
    setTime(min,sec){
        var isTimeOut = false
        if(min < 10){
            min = `0${min}`
        }else{
            min = `${min}`
        }
        if(sec < 10){
            sec = `0${sec}`
        }else{
            sec = `${sec}`
        }
        if(min == 0 && sec == 0){
            this.setState({isTimeOut:true});
        }
        clearInterval(this.state.intervalId)
        var intervalId = setInterval(this.changeTimer,1000)
        this.setState({min:min,sec:sec,intervalId:intervalId,isTimeOut:isTimeOut})
    }
    submit(){
        if(this.state.isTimeOut) return

        var obj = {OTP:this.state.OTP.join(""),type:this.txt.split(':')[1]}
        if(obj.OTP == '') return
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((data)=>{
           if (data.status) this.props.navigate(this.loc)
        })
    }
    componentDidMount(){
        //exmaple
        // this.reset()
        this.setTime(1,6)
    }
    render(){

        return(<section id='otpPage'>
        <div id='otpDiv'>
            <div id="otpTextDiv" >
                <p id="otpText">ENTER OTP</p>
                <p id="mobileText">An OTP is sent to your mobile</p>
                <p id="samplephone">{this.txt}</p>
            </div>
            <div id='otpBoxDiv'>
                <div id='otpBox'>
                    <input type="number" value={this.state.OTP[0]} name="0" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                    <input type="number" value={this.state.OTP[1]} name="1" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                    <input type="number" value={this.state.OTP[2]} name="2" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                    <input type="number" value={this.state.OTP[3]} name="3" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                </div>
                <p id='otpTime'>{this.state.min}:{this.state.sec} <a className="underline  text-Text_blue" onClick={this.getOTP}>Resend</a></p>
                
                <div >
                    <button id="button" type="submit" value={this.loc} onClick={this.submit}>
                        SUBMIT
                    </button>
                </div>
            </div>          
        </div>
    </section>)
    }
}

export default OTPComp