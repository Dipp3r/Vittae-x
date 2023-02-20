import React from "react";
import { WithRouter } from "./routingWrapper";
import checkString from "./stringChecker";
class ForgotPassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.submitLink = 'verifyID'
    }
    changeInVal(e){
        let obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    }
    async submit(){
        let navigationURL = "../mobileOrMailOTP"
        let obj = {}
        let checkRes = checkString(this.state.number,3)
        console.log(checkRes)
        this.setState({numberErr:checkRes.msg})
        if(!checkRes.bool)  return
        obj = {number: this.state.number}
        console.log(obj)
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((data)=>{
            console.log(data)
            if(data.status) this.props.navigate(navigationURL)
        })
    }
    render(){
        console.log(this.state)
        return(       
            
        <section class="phonePg">
            <div id="phoneSignUpFormDiv">
                <div id="phoneSignUpTextDiv">
                <p id="phoneSignUpText">SIGN UP</p>
                </div>
                <div id="fieldBox">
                <p id="mobileLable">Mobile number</p>
                <input onChange={this.changeInVal} name='number' type="number" min={0} max={9999999999} placeholder="1234567890" id="mobileField" />
                <p>{this.state.numberErr}</p>
                <button id="Button" onClick={this.submit}>SIGN UP</button>
                </div>
            </div>
        </section>
        )
    }
}

export default WithRouter(ForgotPassword);