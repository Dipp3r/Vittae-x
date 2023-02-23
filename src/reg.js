import React from 'react';
import ReactDOM from 'react-dom/client';

import checkString from './stringChecker';
import { WithRouter} from './routingWrapper';

class RegisterComp extends React.Component {
    constructor() {
      super();
      this.state = { 
        name: '',
        password: '',
        cPassword: '',
        mail: '',
        passwordType:'password',
        cPasswordType:'password',
        nameErr:'',
        mailErr:'',
        passwordErr:'',
        cPasswordErr:'',
        tAndCErr:'',
        tAndC:false
    }
      this.changeInVal = this.changeInVal.bind(this);
      this.submit = this.submit.bind(this);
      this.changeInputType = this.changeInputType.bind(this)
      this.changeTAndC = this.changeTAndC.bind(this)
      this.changeColor = this.changeColor.bind(this)
    }
    changeInVal(e) {
        if(e.keyCode == 13){
          this.submit()
        }
        let value = e.target.value.trim()
        if(e.currentTarget.name != 'name') e.currentTarget.value = value;
        var obj = {};
        obj[e.currentTarget.name] = value;
        this.setState(obj);
    }
    changeInputType(e){
        let obj = {}
        if(this.state[e.target.getAttribute('value')]== 'password'){
            obj[e.target.getAttribute('value')] = 'txt'
            e.currentTarget.src = require('./images/eye.svg')  
        }else{
            obj[e.target.getAttribute('value')] = 'password'
            e.currentTarget.src = require('./images/eye_off.svg')
        }
        this.setState(obj)
    }
    changeTAndC(e){
        let tAndC = false
        let tAndCErr = ''
        if(this.state.tAndC){
            tAndC = false
            e.currentTarget.style.backgroundColor = '#FFFFFF'       
           tAndCErr = "*agree to the terms & conditions"     
        }else{
            tAndC = true
            e.currentTarget.style.backgroundColor = '#223F80'
        }
        this.setState({tAndC:tAndC,tAndCErr:tAndCErr})
    }
    changeColor(element,color){
      document.querySelector(element).style.borderColor = color
    }
    async submit() {
        console.log("signUp submitted")
        
        console.log(this.state)
        let isErr = false
        let nameErr = '',mailErr = '',mobileErr = '',passwordErr = '',cPasswordErr = ''
        let defaultColor = '#616161',invalidColor = '#BB2230';


        let checkRes = checkString(this.state.name,4)
        // console.log(checkRes)
        this.changeColor('#nameIn',defaultColor)
        this.changeColor('#mailIn',defaultColor)
        this.changeColor('#passwordIn',defaultColor)
        this.changeColor('#cPasswordIn',defaultColor)

        if(!checkRes.bool){
            nameErr = checkRes.msg
            isErr = true
            this.changeColor('#nameIn',invalidColor)
        }
        if(!this.state.tAndC){ 
          isErr = true
          this.setState({tAndCErr:'*agree to the terms & conditions'})
        }
        // console.log(isErr)
        if(!(checkRes = checkString(this.state.mail,2)).bool){
            mailErr = checkRes.msg
            isErr = true
            this.changeColor('#mailIn',invalidColor)
        }
        // console.log(isErr)
        if(!(checkRes = checkString(this.state.password,1)).bool){
            passwordErr = checkRes.msg
            isErr = true
            this.changeColor('#passwordIn',invalidColor)
        }
        // console.log(isErr)
        if(!(checkRes = checkString(this.state.cPassword,1)).bool){
            cPasswordErr = checkRes.msg
            isErr = true
            this.changeColor('#cPasswordIn',invalidColor)
        }
        // console.log(isErr)
        if (!(this.state.cPassword===this.state.password)){
            cPasswordErr = "Passwords do no match";
            isErr = true;
            this.changeColor('#cPasswordIn',invalidColor)
        }
        
        this.setState({
            nameErr:nameErr,
            mobileErr:mobileErr,
            mailErr:mailErr,
            passwordErr:passwordErr,
            cPasswordErr:cPasswordErr
        })
        console.log(isErr)
        console.log(this.state)
        if(isErr)return
        console.log('checked')

        let obj = {
            name:this.state.name,
            mail:this.state.mail,
            password:this.state.password,
            mobile:this.state.mobile
        }
        //sending data to server
        fetch('signUp', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then(data => {
            // console.log(data)
            if(data.status)   this.props.navigate("../dashboard")
          })
      }
    render() {
      // console.log(this.state)
      return (
        
<section id="signUpPg">
  <div id="SignUpFormDiv">
    <div id="SignUpTextDiv">
      <p id="SignUpText">SIGN UP</p>
    </div>
    <div id="fieldBox">
      <p className="label">Name</p>
      <input id='nameIn' type="text" placeholder="Example" className="signUpField" onChange={this.changeInVal} name='name' onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#nameIn','#223F80')} onBlur={()=>this.changeColor('#nameIn','#b8b8b8')} />
      <p className="invalid">{this.state.nameErr}</p>
      <p className="label">Email</p>
      <input id='mailIn' type="email" placeholder="example@gmail.com" className="signUpField" onChange={this.changeInVal} name='mail' onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#mailIn','#223F80')} onBlur={()=>this.changeColor('#mailIn','#b8b8b8')} />
      <p className="invalid">{this.state.mailErr}</p>
      <div className="passwordDiv">
        <p id="mobileLabel">Phone number</p>
        <div className="passwordBox">
          <p id="numberLabel" >{this.props.getItem('number')}</p>
        </div>
      </div>
      <div className="passwordDiv"  >
        <p>Password</p>
        <div className="passwordBox" id='passwordIn' >
          <input  type={this.state.passwordType} placeholder="Example!123" className="passwordField password" onChange={this.changeInVal} name='password'onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#passwordIn','#223F80')} onBlur={()=>this.changeColor('#passwordIn','#b8b8b8')}  />
          <img src={require("./images/eye_off.svg")} alt="eye icon" onClick={this.changeInputType} value ={'passwordType'}/>
        </div>
      </div>
      <p className="invalid">{this.state.passwordErr}</p>

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
        <p>Confirm password</p>
        <div className="passwordBox" id='cPasswordIn'  >
          <input  type={this.state.cPasswordType} placeholder="Example!123" className="passwordField password" onChange={this.changeInVal} name='cPassword' onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#cPasswordIn','#223F80')} onBlur={()=>this.changeColor('#cPasswordIn','#b8b8b8')} />
          <img src={require("./images/eye_off.svg")} alt="eye icon" onClick={this.changeInputType} value ={'cPasswordType'} />
        </div>
      </div>
      <p className=" invalid">{this.state.cPasswordErr}</p>

      <div className="tickBox">
        {/* <!-- when the value is 0 the bg is set transprent otherwise its set to dark blue --> */}
        <button value="0" className="tickButton" onClick={this.changeTAndC}>
          <svg width="10" height="10" viewBox="0 0 15 14" fill="none">
            <path d="M1.5 8L6.5 12.5L13.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <p>
          I agree to the <a onClick={this.props.navigate} value={'../termsAndConditions'}>Terms & Conditions</a></p>
      </div>
      <p id="invalidTC" className="invalid">{this.state.tAndCErr}</p>
      <button id="Button" onClick={this.submit}>SIGN UP</button>
    </div>
  </div>
</section>
        )
    }
  }
export default WithRouter(RegisterComp)