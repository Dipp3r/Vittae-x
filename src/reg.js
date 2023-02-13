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
        mobileErr:'',
        tAndC:false
    }
      this.changeInVal = this.changeInVal.bind(this);
      this.submit = this.submit.bind(this);
      this.changeInputType = this.changeInputType.bind(this)
      this.changeTAndC = this.changeTAndC.bind(this)
    }
    changeInVal(e) {
        let value = e.target.value.trim()
        if(e.target.name != 'name') e.target.value = value;
        var obj = {};
        obj[e.target.name] = value;
        this.setState(obj);
    }
    changeInputType(e){
        let obj = {}
        if(this.state[e.target.getAttribute('value')]== 'password'){
            obj[e.target.getAttribute('value')] = 'txt'
        }else{
            obj[e.target.getAttribute('value')] = 'password'
        }
        this.setState(obj)
    }
    changeTAndC(e){
        let tAndC = false
        if(this.state.tAndC){
            tAndC = false
            e.target.style.backgroundColor = '#FFFFFF'            
        }else{
            tAndC = true
            e.target.style.backgroundColor = '#223F80'
        }
        this.setState({tAndC:tAndC})
    }
    async submit() {
        console.log(this.state)
        let checkRes = checkString(this.state.name,4)
        let isErr = false
        let nameErr = '',mailErr = '',mobileErr = '',passwordErr = '',cPasswordErr = ''
        console.log(checkRes)
        if(!checkRes.bool){
            nameErr = checkRes.msg
            isErr = true
        }
        if(!(checkRes = checkString(this.state.mail,2)).bool){
            mailErr = checkRes.msg
            isErr = true
        }
        if(!(checkRes = checkString(this.state.mobile,3)).bool){
            mobileErr=checkRes.msg
            isErr = true
        }
        if(!(checkRes = checkString(this.state.password,1)).bool){
            passwordErr = checkRes.msg
            isErr = true
        }
        if(!(checkRes = checkString(this.state.cPassword,1)).bool){
            cPasswordErr = checkRes.msg
            isErr = true
        }
        this.setState({
            nameErr:nameErr,
            mobileErr:mobileErr,
            mailErr:mailErr,
            passwordErr:passwordErr,
            cPasswordErr:cPasswordErr
        })
        console.log(checkRes)
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
            if(data.status)   this.props.navigate("../mobileOTP")
          })
      }
    render() {
      // console.log(this.state)
      return (
        <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 pt-20 pb-20 p-6">
    <div className="bg-white max-w-sm rounded-2xl w-full shadow-2xl">
        <div className="p-8 pt-4 pb-4">
            <p className="heading text-Text_blue text-xl">SIGN UP</p>
        </div>
        <div>
            <div className="bg-white m-8 mt-0 mb-0 rounded-b-xl">
                <div>
                    <p className="text-Text_blue text-sm p-2">Name</p>
                    <input name='name' onChange={this.changeInVal} type="text" placeholder="Example" className=" font-thin rounded-md p-2 w-full"/>
                    <p id="nameErr" className="text-Text_blue text-xs ml-3 text-red-700">{this.state.nameErr}</p>
                </div>

                <div className="mt-1">
                    <p className="text-Text_blue text-sm p-2">Email</p>
                    <input  name='mail' onChange={this.changeInVal} type="mail" placeholder="example@gmail.com" className=" font-thin rounded-md p-2 w-full"/>
                    <p id="emailErr" className="text-Text_blue text-xs ml-3 text-red-700">{this.state.mailErr}</p>
                </div>

                <div className="mt-1">
                    <p className="text-Text_blue text-sm p-2">Phone number</p>
                    <input  name='mobile' onChange={this.changeInVal} type="tel" className=" font-thin rounded-md p-2 w-full"/>
                    <p id="emailErr" className="text-Text_blue text-xs ml-3 text-red-700">{this.state.mobileErr}</p>
                </div>
                

                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Password</p>
                    <div className="flex-row flex border-2 border-border_gray rounded-md">
                        <input  name='password' onChange={this.changeInVal} type={this.state.passwordType}  placeholder="Example!123" className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} onClick={this.changeInputType} value ={'passwordType'} className="m-2" alt="eye icon"/>
                    </div>
                    <p id="passwordErr" className="text-Text_blue text-xs ml-3 text-red-700">{this.state.passwordErr}</p>
                </div>

                <div className="ml-3">
                    <p id="password" className="grayText text-sm mt-2">Password must contain at least</p>
                    <div className="ml-4">
                        <al className="grayText text-sm font-thin">
                            <li>8 characters</li>
                            <li>uppercase and lowercase</li>
                            <li>number and a special character</li>
                        </al>
                    </div>
                </div>

                <div className="mt-1">
                    <p className="text-Text_blue text-sm p-2">Confirm password</p>
                    <div className="flex-row flex border-2 border-border_gray rounded-md">
                        <input  name='cPassword' onChange={this.changeInVal} type={this.state.cPasswordType}  placeholder="Example!123" className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} onClick={this.changeInputType} value={'cPasswordType'} className="m-2" alt="eye icon"/>
                    </div>
                    <p id="confirmPasswordErr" className="text-Text_blue text-xs ml-3 text-red-700">{this.state.cPasswordErr}</p>
                </div>
                
                <div className="tickBox" style={{"margin-top":"20px","margin-bottom":"10px","padding":"0px","font-size": "12px"}}>
                      <button value="0" className="tickButton" style={{"width": "15px","height": "15px"}} onClick={this.changeTAndC}>
                          <svg width="10" height="10" viewBox="0 0 15 14" fill="none">
                              <path d="M1.5 8L6.5 12.5L13.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </button>
                      <label for="remember_me" className="grayText mt-1"> I agree to the <a onClick={this.props.navigate} value={'../termsAndConditions'} className="underline text-Text_blue">T&C</a></label>
                  </div>
                
                  <button className="button" onClick={this.submit} style={{"margin-top":"0px"}}>
                        SIGN UP
                    </button>
            </div>
        </div>          
    </div>
</section>

        )
    }
  }
export default WithRouter(RegisterComp)