import React from "react";
import { WithRouter } from "./routingWrapper";

class OTPComp extends React.Component {
    constructor(props){
        super(props);
        this.state = {OTP:["0","0","0","0"],
        min :"01",
        sec:"00",
        intervalId:0
        }
        this.changeInVal = this.changeInVal.bind(this)
        this.changeTimer = this.changeTimer.bind(this)
        this.setTime = this.setTime.bind(this)
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
        
        text[num] = value
        this.setState({OTP:text})
        // console.log(text,this.state.OTP)
        
        if(inputclass[num].value == ""){
            inputclass[num].value = value[0]
            console.log('zero')
        }else if (num <=2 && value.length > 1){
            inputclass[num].value = value[0]
            inputclass[num+1].value = value.slice(-1)
        }else{
            inputclass[num].value = ''
            inputclass[num].value = value.slice(-1)
        }
        
        if(num<=2 && value !== ''){
            inputclass[num+1].focus()
        }
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
        clearInterval(this.state.intervalId)
        var intervalId = setInterval(this.changeTimer,1000)
        this.setState({min:min,sec:sec,intervalId:intervalId})
    }
    componentDidMount(){
    //    exmaple
        this.setTime(1,6)
    }
    render(){
        var text = this.txt.split(':')

        return(<section className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 pt-20 pb-20 p-6">
        <div className="bg-white max-w-sm rounded-2xl w-full shadow-2xl">
            <div className="p-8 pt-4 pb-4">
                <p className="heading text-Text_blue text-xl">ENTER OTP</p>
                <p className="text-sm mt-2">An OTP is sent to your {text[0]}</p>
                <p id="samplephone" className="text-Text_blue text-sm">{text[1]}</p>
            </div>
            <div>
                <div className="bg-white m-8 mt-0 mb-0 rounded-b-xl">
                    
                    <div className="flex flex-row gap-x-5 justify-center mt-6" id='inputBarContainer'>
                        <input type="number" name="0" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                        <input type="number" name="1" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                        <input type="number" name="2" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                        <input type="number" name="3" onChange={this.changeInVal} className="otp_num text-Text_blue w-10 h-10 rounded-lg text-center text-2xl"/>
                    </div>
                    <p className="float-right mr-12 mt-1 text-sm text-border_gray">{this.state.min}:{this.state.sec} <a className="underline text-Text_blue">Resend</a></p>
                    
    
                    <div className="pl-2 mt-14 text-center">
                        {this.anchorTags}
                    </div>
                    
                    <div className="mt-2 mb-10">
                        <button id="button" type="submit" value={this.loc} onClick={this.props.navigate} className="bg-gradient-to-r text-white font-normal text-md text-center p-2 from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 w-full h-12 shadow-xl rounded-xl">
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>          
        </div>
    </section>)
    }
}

export default OTPComp