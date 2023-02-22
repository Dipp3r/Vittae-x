import React from "react";
import { WithRouter } from "./routingWrapper";
import checkString from "./stringChecker";

class NewPassComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {password:'',cPassword:'',passType:'password',cPassType:'password',cPasswordErr:'',passwordErr:''}
        this.submitLink = 'setNewPassword'
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.changePasswordVis = this.changePasswordVis.bind(this)
    }
    changePasswordVis(e){
        let state 
        if(this.state[e.currentTarget.name] == 'password'){
            state = 'text'
            e.currentTarget.src = require("./images/eye_off.svg")
        }else{
            state = 'password'
            e.currentTarget.src = require("./images/eye.svg")
        }
        let obj = {}
        obj[e.currentTarget.name] = state
        this.setState(obj)
    }
    changeInVal(e){
        if(e.keyCode == 13){
            this.submit()
          }
        var obj = {};
        obj[e.currentTarget.name] = e.target.value.trim();
        this.setState(obj);
    }
    submit(){
        console.log('submit clicked')
        let isErr = false
        let passCheck = checkString(this.state.password,1)
        let cPassCheck = checkString(this.state.cPassword,1)
        if (!cPassCheck.bool) isErr = true
        console.log('cpass',isErr)
        if(!passCheck.bool) isErr = true
        console.log('pass',isErr)
        if(this.state.password !== this.state.cPassword){
            isErr = true
            this.setState({cPassword:""})            
        }
        console.log(isErr)
        if(isErr) return
        this.setState({passwordErr:passCheck.msg,cPasswordErr:cPassCheck.msg})

        var obj = {password:this.state.password}
        //sending data to the server
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.status == true){
                this.props.navigate("../login")
            }
        })
        
    }
    render(){
        console.log(this.state)
        return(
<section id="newPassword">
    <div id="phoneSignUpFormDiv">
        <div id="phoneSignUpTextDiv">
            <p id="phoneSignUpText">CREATE A STRONG PASSWORD</p>
        </div>

    <div id="constraintDiv">
        <p id="title">Password must contain at least</p>
        <div id="constraints">
            <al id="constraintText">
                <li>8 characters</li>
                <li>uppercase and lowercase</li>
            </al>
        </div>
    </div>

    <div className="passwordDiv">
        <p>New password</p>
        <div className="passwordBox">
            <input type={this.state.passType} onKeyDown={this.changeInVal} onChange={this.changeInVal} name='password' placeholder="Example!123" className="passwordField password" />
            <img src={require("./images/eye.svg")} onClick={this.changePasswordVis} name="passType" alt="eye icon" />
        
        </div>
    </div>
    <p className="invalid">{this.state.passwordErr}</p>
    <div className="passwordDiv">
      <p>Confirm password</p>
      <div className="passwordBox">
        <input type={this.state.cPassType}  onChange={this.changeInVal} onKeyDown={this.changeInVal}  placeholder="Example!123" className="passwordField password" name="cPassword" />
        <img src={require("./images/eye.svg")} onClick={this.changePasswordVis} name="cPassType"  alt="eye icon" />
      </div>
    </div>
    <p className="invalid">{this.state.cPasswordErr}</p>

    <button id="Button" onClick={this.submit}>SIGN IN</button>
  </div>
</section>
        )
    };
};

export default WithRouter(NewPassComp);