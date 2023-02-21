import React from "react";
import { WithRouter } from "./routingWrapper";
import checkString from "./stringChecker";

class NewPassComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {password:'',cPassword:'',passType:'password',cPassType:'password'}
        this.submitLink = 'setNewPassword'
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.changePasswordVis = this.changePasswordVis.bind(this)
    }
    changePasswordVis(e){
        let state = this.state[e.currentTarget.name] == 'password'?'text':'password'
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
        if(this.state.password == '') return
        let isErr = false
        let passCheck = checkString(this.state.password,2)
        let cPassCheck = checkString(this.state.cPassword,2)
        if (!cPassCheck.bool) isErr = true
        if(!passCheck.bool) isErr = true
        if(this.state.password !== this.state.cPassword){
            isErr = true
            this.setState({cPassword:""})            
        }
        if(isErr) return
        this.setState({passwordErr:passCheck,cPasswordErr:cPassCheck})
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
        .then((data)=>{
        if(data.status) this.props.navigate("../login")
        })
    }
    render(){
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
            <input type="password" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='password' placeholder="Example!123" className="passwordField password" />
            <img src={require("./images/eye.svg")} onClick={this.changePasswordVis} name="passType" alt="eye icon" />
        </div>
    </div>
    <p className="invalid">{this.state.passwordErr}</p>
    <div className="passwordDiv">
      <p>Confirm password</p>
      <div className="passwordBox">
        <input type="password"  onChange={this.changeInVal} onKeyDown={this.changeInVal}  placeholder="Example!123" className="passwordField password" />
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