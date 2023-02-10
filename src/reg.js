import React from 'react';
import ReactDOM from 'react-dom/client';

import checkString from './stringChecker';
import { WithRouter} from './routingWrapper';

class RegisterComp extends React.Component {
    constructor() {
      super();
      this.state = { name: '', password: '', Cpassword: '', email: ''};
      this.changeInVal = this.changeInVal.bind(this);
      this.submit = this.submit.bind(this);
      
    }
    changeInVal(e) {
      var obj = {};
      obj[e.target.name] = e.target.value.trim();
      this.setState(obj);
    }
  
    async submit() {
      this.props.navigate("../mobileOTP")

      //checking 
      // if (!checkString(this.state.name, 1)) {
      //   this.setState({ message: 'incorrect user name!' })
      //   return
      // } else if (!(checkString(this.state.email, 3))) {
      //   this.setState({ message: 'incorrect E-mailID!' })
      //   return
      // } else if ((this.state.email.slice(0, (this.state.email.match(/[@]/)).index).toLowerCase()) == this.state.name.toLowerCase()) {
      //   this.setState({ message: "user name and Email name shouldn't be same" })
      //   return
      // } else if (!checkString(this.state.password, 2)) {
      //   this.setState({ message: 'password must contain a Uppercase alphabet,Lowercase alphabet,digit and special character' })
      //   return
      // } else if (this.state.password != this.state.Cpassword) {
      //   this.setState({ message: 'confirm password again', Cpassword: '' })
      //   return
      // } else {



        var obj = this.state
        delete obj.Cpassword
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
      var inputStyle = "hover:scale-110 transition transform duration-500 w-4/5 md:w-1/2 rounded-full bg-white/70 font-thin text-center text-md text-black px-3 border border-gray-500"
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
                    <p id="nameErr" className="invalid text-Text_blue text-xs ml-3 text-red-700">name</p>
                </div>

                <div className="mt-1">
                    <p className="text-Text_blue text-sm p-2">Email</p>
                    <input  name='mail' onChange={this.changeInVal} type="text" placeholder="example@gmail.com" className=" font-thin rounded-md p-2 w-full"/>
                    <p id="emailErr" className="invalid text-Text_blue text-xs ml-3 text-red-700"></p>
                </div>

                <div className="mt-1">
                    <p className="text-Text_blue text-sm p-2">Phone number</p>
                    <input  name='mobile' onChange={this.changeInVal} type="tel" placeholder="1234567890" className=" font-thin rounded-md p-2 w-full"/>
                    <p id="emailErr" className="invalid text-Text_blue text-xs ml-3 text-red-700"></p>
                </div>
                

                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Password</p>
                    <div className="flex-row flex border-2 border-border_gray rounded-md">
                        <input  name='password' onChange={this.changeInVal} type="password"  placeholder="Example!123" className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} className="m-2" alt="eye icon"/>
                    </div>
                    <p id="passwordErr" className="invalid text-Text_blue text-xs ml-3 text-red-700">* invalid name</p>
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
                        <input  name='Cpassword' onChange={this.changeInVal} type="password"  placeholder="Example!123" className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} className="m-2" alt="eye icon"/>
                    </div>
                    <p id="confirmPasswordErr" className="invalid text-Text_blue text-xs ml-3 text-red-700">* invalid name</p>
                </div>
                
                <div className="tickBox" style={{"margin-top":"20px","margin-bottom":"10px","padding":"0px","font-size": "12px"}}>
                      <button value="0" className="tickButton" style={{"width": "15px","height": "15px"}}>
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