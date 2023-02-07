import React from 'react';
import ReactDOM from 'react-dom/client';

import checkString from './stringChecker';
import { WithRouter} from './routingWrapper';

class RegisterComp extends React.Component {
    constructor() {
      super();
      this.state = { name: '', password: '', Cpassword: '', email: '', message: '' };
      this.changeInVal = this.changeInVal.bind(this);
      this.sendRegData = this.sendRegData.bind(this);
      
    }
    changeInVal(e) {
      var obj = {};
      obj[e.target.name] = e.target.value.trim();
      this.setState(obj);
    }
  
    sendRegData() {
      // console.log(this.state)
     

      //checking 
      if (!checkString(this.state.name, 1)) {
        this.setState({ message: 'incorrect user name!' })
        return
      } else if (!(checkString(this.state.email, 3))) {
        this.setState({ message: 'incorrect E-mailID!' })
        return
      } else if ((this.state.email.slice(0, (this.state.email.match(/[@]/)).index).toLowerCase()) == this.state.name.toLowerCase()) {
        this.setState({ message: "user name and Email name shouldn't be same" })
        return
      } else if (!checkString(this.state.password, 2)) {
        this.setState({ message: 'password must contain a Uppercase alphabet,Lowercase alphabet,digit and special character' })
        return
      } else if (this.state.password != this.state.Cpassword) {
        this.setState({ message: 'confirm password again', Cpassword: '' })
        return
      } else {
        var obj = this.state
        delete obj.message
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
            var string = ''
            switch (data.status) {
              case 4:
                string = 'registration completed!!!'
                this.props.navigate("./home")
                break;
              case 5:
                string = 'user name taken!'
                break;
              case 6:
                string = 'already registered!!'
                break;
              default:
                string = ''
            }
            
            this.setState({ message: string })
          })
      }
  
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
                    <input type="text" placeholder="Example" className=" font-thin rounded-md p-2 w-full"/>
                </div>

                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Email</p>
                    <input type="text" placeholder="example@gmail.com" className=" font-thin rounded-md p-2 w-full"/>
                </div>

                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Phone number</p>
                    <input type="text" placeholder="1234567890" className=" font-thin rounded-md p-2 w-full"/>
                </div>
                

                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Password</p>
                    <div className="flex-row flex border-2 border-border_gray rounded-md">
                        <input type="password"  placeholder="Example!123" className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} className="m-2" alt="eye icon"/>
                    </div>
                </div>

                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Confirm password</p>
                    <div className="flex-row flex border-2 border-border_gray rounded-md">
                        <input type="password"  placeholder="Example!123" className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} className="m-2" alt="eye icon"/>
                    </div>
                </div>

                <div className="pl-2 mt-8">
                    <input type="checkbox" id=""/>
                    <label for="remember_me" className="text-border_gray"> I agree to the <a className="underline text-Text_blue">T&C</a></label>
                </div>
                
                <div className="mt-2">
                    <button id="button" className="bg-gradient-to-r text-white font-normal text-md text-center p-2 from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 w-full h-12 rounded-xl">
                        SIGN UP
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-400 m-8">Already have an account? <a value='../login' onClick={this.props.navigate} className="text-Text_blue ml-1 underline text-xs"> Sign in</a> </p>
                </div>
            </div>
        </div>          
    </div>
</section>

        )
    }
  }
  
export default WithRouter(RegisterComp)