import React from 'react';
import ReactDOM from 'react-dom/client';
import checkString from './stringChecker';

class RegisterComp extends React.Component {
    constructor() {
      super();
      this.state = { userName: '', password: '', Cpassword: '', email: '', message: '' };
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
      if (!checkString(this.state.userName, 1)) {
        this.setState({ message: 'incorrect user name!' })
        return
      } else if (!(checkString(this.state.email, 3))) {
        this.setState({ message: 'incorrect E-mailID!' })
        return
      } else if ((this.state.email.slice(0, (this.state.email.match(/[@]/)).index).toLowerCase()) == this.state.userName.toLowerCase()) {
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
              case 3:
                string = 'registration completed!!!'
                this.props.changeStage(3)
                break;
              case 4:
                string = 'user name taken!'
                break;
              case 5:
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
        <section>
            <nav className="w-full h-16 py-3 px-4 align-center bg-white rounded-b-xl shadow-md fixed">
                <img src={require("./images/VITTAE_logo.png")} alt="vittae logo" class="h-10"/>
            </nav>
            <div className="flex justify-center items-center h-screen"> 
                <div className="text-xl bg-_blue/90 p-5 w-60 md:w-1/2 xl:w-1/4 h-1/2 md:h-96 rounded-xl transition-colors backdrop-blur-xl text-center bg-opacity-30 font-bold backdrop-blur-xl bg-clip-padding backdrop-filter z-50 smooth-effect 'style'=z-index:100 shadow-xl">
                    <div className='inputBox'>
                        <h3>Registration Form</h3>
                        <input className={inputStyle} type='text' placeholder='Enter your user name' name='userName' value={this.state.userName} maxLength='50' onChange={this.changeInVal} required />
                        <input className={inputStyle} type='email' placeholder='Enter your emailID' name='email' onChange={this.changeInVal} required />
                        <input className={inputStyle} type='password' placeholder='Enter your password' name='password' onChange={this.changeInVal} minLength='4' maxLength='30' required />
                        <input className={inputStyle} type='password' placeholder='Confirm your password' name='Cpassword' value={this.state.Cpassword} onChange={this.changeInVal} required />
                        <p>{this.state.message}</p>
                    </div>
                    <div className='buttonBox'>
                        <button onClick={this.sendRegData} className="bg-white/70 duration-500 h-7 m-10 w-24 md:p-1 text-sm md:text-md hover:shadow-md hover:text-black/80 hover:scale-95 text-gray-600/80 rounded-xl">submit</button>
                    </div>
                </div>
            </div>
        </section>
        )
    }
  }
  
export default RegisterComp