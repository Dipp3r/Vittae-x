import React from 'react';
// import ReactDOM from 'react-dom/client';

import checkString from './stringChecker';
import { WithRouter} from './routingWrapper';
import './styles/reg.css';

import eye from "./images/eye.svg"
import eyeOff from "./images/eye_off.svg"

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
      this.submitLink = ""
    }
    changeInVal(e) {
        if(e.keyCode === 13){
          this.submit()
        }
        let value = e.target.value.trim()
        if(e.currentTarget.name !== 'name') e.currentTarget.value = value;
        var obj = {};
        obj[e.currentTarget.name] = value;
        this.setState(obj);
    }
    changeInputType(e){
        let obj = {}
        if(this.state[e.target.getAttribute('value')]=== 'password'){
            obj[e.target.getAttribute('value')] = 'txt'
            e.currentTarget.src = eye  
        }else{
            obj[e.target.getAttribute('value')] = 'password'
            e.currentTarget.src = eyeOff
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
        let firstNameErr = '',lastNameErr = '',mailErr = '',mobileErr = '',passwordErr = '',cPasswordErr = ''
        let defaultColor = '#616161',invalidColor = '#BB2230';


        // console.log(checkRes)
        this.changeColor('#firstNameIn',defaultColor)
        this.changeColor('#secondNameIn',defaultColor)
        this.changeColor('#mailIn',defaultColor)
        this.changeColor('#passwordIn',defaultColor)
        this.changeColor('#cPasswordIn',defaultColor)
        
        let checkRes 
        if(!(checkRes= checkString(this.state.first_name,4)).bool){
            firstNameErr = checkRes.msg
            isErr = true
            this.changeColor('#firstNameIn',invalidColor)
        }
        if(!(checkRes= checkString(this.state.last_name,4)).bool){
          lastNameErr = checkRes.msg
          isErr = true
          this.changeColor('#secondNameIn',invalidColor)
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
          firstNameErr:firstNameErr,
          lastNameErr:lastNameErr,
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
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            mail:this.state.mail,
            password:this.state.password,
            phone:this.props.getItem('phone')
        }
        //sending data to server
        fetch(this.submitLink, {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then((response) => {
            if (response.status !== 200) throw new Error('Something went wrong')
            
            return response.json()
          })
          .then((data)=>{
            console.log(data)
            this.props.navigate("../login")
          })
          
      }
    componentDidMount(){
      console.log(this.props.getItem)
      console.log(this.state)
      console.log(this.props.getItem('id'))
      this.submitLink = process.env.BASE_SERVER_URL+`/set-password/${this.props.getItem('id')}/`
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
      <p className="label">first name</p>
      <input id='firstNameIn' type="text" placeholder="Example" className="signUpField" onChange={this.changeInVal} name='first_name' onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#firstNameIn','#223F80')} onBlur={()=>this.changeColor('#firstNameIn','#b8b8b8')} />
      <p className="invalid">{this.state.firstNameErr}</p>
      
      <p className="label">last name</p>
      <input id='secondNameIn' type="text" placeholder="Example" className="signUpField" onChange={this.changeInVal} name='last_name' onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#secondNameIn','#223F80')} onBlur={()=>this.changeColor('#secondNameIn','#b8b8b8')} />
      <p className="invalid">{this.state.lastNameErr}</p>

      <p className="label">Email</p>
      <input id='mailIn' type="email" placeholder="example@gmail.com" className="signUpField" onChange={this.changeInVal} name='mail' onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#mailIn','#223F80')} onBlur={()=>this.changeColor('#mailIn','#b8b8b8')} />
      <p className="invalid">{this.state.mailErr}</p>
      <div className="passwordDiv">
        <p id="mobileLabel">Phone number</p>
        <div className="passwordBox">
          <p id="numberLabel" >{this.props.getItem('phone')}</p>
        </div>
      </div>
      <div className="passwordDiv"  >
        <p>Password</p>
        <div className="passwordBox" id='passwordIn' >
          <input  type={this.state.passwordType} placeholder="Example!123" className="passwordField password" onChange={this.changeInVal} name='password'onKeyDown={this.changeInVal}   onFocus={()=>this.changeColor('#passwordIn','#223F80')} onBlur={()=>this.changeColor('#passwordIn','#b8b8b8')}  />
          <img src={eyeOff} alt="eye icon" onClick={this.changeInputType} value ={'passwordType'}/>
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
          <img src={eyeOff} alt="eye icon" onClick={this.changeInputType} value ={'cPasswordType'} />
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
          I agree to the <p onClick={this.props.navigate} value={'../termsAndConditions'}>Terms & Conditions</p></p>
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