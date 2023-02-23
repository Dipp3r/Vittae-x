import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect ,useNavigate} from 'react-router-dom';
import { WithRouter } from './routingWrapper';
import checkString from './stringChecker';

class LoginComp extends React.Component{
    constructor(){
        super()
        this.state = {mobile:'',password:'',mobileErr:'',passwordErr:'',passwordInType:'password',rememberMe:false}
        this.submitLink = 'signIn'
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.changePasswordVis = this.changePasswordVis.bind(this)
        this.changeRememberMe = this.changeRememberMe.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }   
    changeInVal(e){
        let obj = {};
        // console.log(e.keyCode)
        if(e.keyCode == 13){
          this.submit()
        }
        if(e.currentTarget.name == 'mobile'){
            // console.log(e.currentTarget.value)
           if(/\D/.test(e.currentTarget.value.slice(-1))){
                e.currentTarget.value = e.currentTarget.value.replace(/\D/,'')
                return
           }
        }
        obj[e.currentTarget.name] = e.target.value.trim();
        this.setState(obj);
    }
    changePasswordVis(e){
        if(this.state.passwordInType == 'password'){
            this.setState({passwordInType:'text'})
            e.currentTarget.src = require('./images/eye.svg')
        }else{
            this.setState({passwordInType:'password'})
            e.currentTarget.src = require('./images/eye_off.svg')
        }
    }
    changeColor(element,color){
      document.querySelector(element).style.borderColor = color
      console.log(document.querySelector(element))
    }
    changeRememberMe(e){
        let rememberMeBox = document.body.querySelector("#rememberMeBox")
        if(this.state.rememberMe){
            this.setState({rememberMe:false})
            rememberMeBox.style.backgroundColor = '#FFFFFF'
        }else{
            this.setState({rememberMe:true})
            rememberMeBox.style.backgroundColor = '#223F80'
        }
    }   
    async submit(e){
        console.log('clicked')
        let isErr = false
        let defaultColor = '#b8b8b8'
        let invalidColor = '#BB2230'
        let checkRes = checkString(this.state.password,1) 
        if(!checkRes.bool){
            this.setState({passwordErr:checkRes.msg})
            isErr = true
            this.changeColor('#passwordBox',invalidColor)
        }else{
            this.setState({passwordErr:""})
            this.changeColor('#passwordBox',defaultColor)
        }

        this.changeColor('#numberField',defaultColor)
        checkRes = checkString(this.state.mobile,3)
        if(!checkRes.bool){
          isErr = true
          this.changeColor('#numberField',invalidColor)
        }
        this.setState({mobileErr:checkRes.msg})
        if(isErr) return
        let obj = {
            mobile:this.state.mobile,
            password:this.state.password,
            rememberMe:this.state.rememberMe
        }
        
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
                this.props.navigate("../dashboard")
            }
        })
    }
    render(){


    return(
<section id="signInPage">
  <div id="signInFormDiv">
    <div id="signInTextDiv">
      <p id="signInText">SIGN IN</p>
    </div>
    <div id="fieldBox">
      <p id="emailLable" className='inLabel' >Mobile number</p>
      <input onChange={this.changeInVal} onKeyDown={this.changeInVal} onFocus={()=>this.changeColor('#numberField','#223F80')} onBlur={()=>this.changeColor('#numberField','#b8b8b8')} value={this.state.mobile} name='mobile'  type="tel" placeholder="1234567890" id="numberField" />
        <p className="invalid">{this.state.mobileErr}</p>
      <div id="passwordDiv">
        <p className='inLabel'>Password</p>
        <div id="passwordBox">
          <input onChange={this.changeInVal} onKeyDown={this.changeInVal} onFocus={()=>this.changeColor('#passwordBox','#223F80')} onBlur={()=>this.changeColor('#passwordBox','#b8b8b8')}  name='password'  type={this.state.passwordInType} placeholder="Example!123" id="passwordField" className="password" value={this.state.password}  />
          <img src={require("./images/eye_off.svg")} alt="eye" onClick ={this.changePasswordVis} />
        </div>
        <p className="invalid" >{this.state.passwordErr}</p>
      </div>

      <div className="tickBox">
        {/* <!--when the value is 0 the bg is set transprent otherwise its set to dark blue --> */}
        <button value="0" className="tickButton" onClick={this.changeRememberMe} id="rememberMeBox">
          <svg width="12" height="10" viewBox="0 0 15 14" fill="none">
            <path d="M1.5 8L6.5 12.5L13.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <p>Remember me</p>
      </div>

      <div id="buttonDiv">
        <button id="Button" onClick={this.submit}>SIGN IN</button>
        <p id="forgotPwd" onClick={this.props.navigate} value="../forgotPassword">Forgot password?</p>
      </div>

      <div id="accDiv">
        <hr />
        <p>Need an account?<a onClick={this.props.navigate} value="../mobileSignUp">Signup</a></p>
      </div>
    </div>
  </div>
</section>
    )
    }
}
export default WithRouter(LoginComp);
