import React from "react";
import { WithRouter } from "./routingWrapper";
import './styles/OTP.css';

class OTPComp extends React.Component {
    constructor(props){
        super(props);
        this.state = {OTP:["","","",""],
        min :"01",
        sec:"00",
        intervalId:0,
        isTimeOut:false
        }
        this.submitLink = 'http://dev.api.vittae.money/broker/check-otp/'
        this.loc = '../'
        this.changeInVal = this.changeInVal.bind(this)
        this.changeTimer = this.changeTimer.bind(this)
        this.setTime = this.setTime.bind(this)
        this.submit = this.submit.bind(this)
        this.reset = this.reset.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }   
    changeInVal(e){
        // console.log(Number.parseInt(e.target.getAttribute('name')),e.target.value)
        if(e.keyCode == 13){
            this.submit()
          }
        var text = this.state.OTP
        var num = Number.parseInt(e.target.getAttribute('name'))
        var value = e.currentTarget.value
        var inputclass = document.body.querySelector('#otpBox').children
        // // console.log(value == "",num)
        // value = Number.parseInt(value).split(-1)
        // if(!Number.isInteger(value)) return;
        // console.log(num,value)
        
        // console.log(text,this.state.OTP)
        if(inputclass[num].value == ""){ 
            inputclass[num].value = value[0]
            text[num] = value[0]
            // console.log('value == ""',value)
            if(num<=2 && value != '' ){
                inputclass[num+1].focus()
                // console.log('front')
            }
        }else if (num <=2 && value.length > 1){
            inputclass[num].value = value[0]
            inputclass[num+1].value = value.slice(-1)
            text[num] = value[0]
            text[num+1] = value.slice(-1)
            // console.log('Split value')
            
            inputclass[num+1].focus()
        }else if(num ==0 && value == ""){
            inputclass[num].value = ''
            text[num] = ''
            // console.log('remove above')
        }else{
            inputclass[num].value = ''
            inputclass[num].value = value.slice(-1)
            text[num] = value.slice(-1)
        }
        
        if(value == '' && num >0){
            inputclass[num-1].focus()
            // console.log('back')
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
    changeColor(element,color){
        document.querySelector(element).style.borderColor = color
      }
    async submit(){
        return this.props.navigate(this.loc);
        if(this.state.isTimeOut) return
        var obj = {OTP:this.state.OTP.join(""),phone:this.props.getItem('phone')}
        if(obj.OTP == '') return
        console.log(obj)
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) =>{
            console.log(response);
            if(response.status == 201){
                return response.json()
            }
            throw new Error('Something went wrong')
        })
        .then((data)=>{
            console.log(data)            
            this.props.setItem(data)
            this.props.navigate(this.loc)
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
                    <input id='box0' type="number" value={this.state.OTP[0]} name="0" onKeyDown={this.changeInVal} onChange={this.changeInVal} onFocus={()=>this.changeColor('#box0','#223F80')} onBlur={()=>this.changeColor('#box0','#b8b8b8')}  />
                    <input id='box1' type="number" value={this.state.OTP[1]} name="1" onKeyDown={this.changeInVal}   onChange={this.changeInVal} onFocus={()=>this.changeColor('#box1','#223F80')} onBlur={()=>this.changeColor('#box1','#b8b8b8')} />
                    <input id='box3' type="number" value={this.state.OTP[2]} name="2" onKeyDown={this.changeInVal}   onChange={this.changeInVal} onFocus={()=>this.changeColor('#box3','#223F80')} onBlur={()=>this.changeColor('#box3','#b8b8b8')}  />
                    <input id='box4' type="number" value={this.state.OTP[3]} name="3" onKeyDown={this.changeInVal}   onChange={this.changeInVal} onFocus={()=>this.changeColor('#box4','#223F80')} onBlur={()=>this.changeColor('#box4','#b8b8b8')} />
                </div>
                <p id='otpTime'>{this.state.min}:{this.state.sec} <a onClick={this.reset}>Resend</a></p>
                
                <div id="submit">
                    <button id="Button" type="submit" value={this.loc} onClick={this.submit}>
                        SUBMIT
                    </button>
                </div>
            </div>          
        </div>
    </section>)
    }
}

export default OTPComp