import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect ,useNavigate} from 'react-router-dom';
import { WithRouter } from './routingWrapper';
import checkString from './stringChecker';

class LoginComp extends React.Component{
    constructor(){
        super()
        this.state = {name:'',password:'',message:''}
        this.changeInVal = this.changeInVal.bind(this)
        this.sendLoginData = this.sendLoginData.bind(this)
    }
    changeInVal(e){
        var obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    } 

    sendLoginData(e){
        console.log('clicked')
        this.props.navigate("../home")
        if(this.state.name == '' | this.state.password == ''){
            this.setState({message:'fill all the fields'})
            return
        }
        
        var obj = this.state
        delete obj.message
        //sending data to the server
        fetch('login',{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            var string = ''
            switch(data.status){
                case 1:
                    string = 'not yet registered!!!'
                    break;
                case 2:
                    string = 'successfully logged in!'
                    this.props.navigate("./home")
                    break;
                case 3:
                    string = 'forgot password?'
                    break;
                default:
                    string = ''
            }
            this.setState({message:string})
        })
    }
    render(){
        console.log(this.props)
    return(
        <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 pt-20 pb-20 p-6">
        <div className="bg-white max-w-sm rounded-2xl w-full shadow-2xl">
            <div className="p-8">
                <p className="text-Text_blue font-bold">SIGN IN</p>
            </div>
            <div>
                <div className="bg-white m-8 mt-0 mb-0 rounded-b-xl">
                    
                    <div>
                        <p className="text-Text_blue text-sm p-2">Email or phone number</p>
                        <input type="text" placeholder="example@gmail.com" className=" font-thin rounded-md p-2 w-full"/>
                    </div>

                    <div className="pt-5">
                        <p className="text-Text_blue text-sm p-2">Password</p>
                        <div className="flex-row flex border-2 border-border_gray rounded-md">
                            <input type="password"  placeholder="Example123" className="password font-thin rounded-md p-2 w-full"/>
                            <img  src={require("./images/eye.svg")} className="m-2" alt="eye icon"/>
                        </div>
                    </div>
                    <div class="tickBox ">
                        <button value="0" class="tickButton">
                            <svg width="12" height="10" viewBox="0 0 15 14" fill="none">
                                <path d="M1.5 8L6.5 12.5L13.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <p  class="text-Text_blue"> Remember me</p>
                    </div>
                    
                    <div className="mt-1">
                        <button id="button" style={{"margin":"0px"}} onClick={this.sendLoginData} value="./register" className="bg-gradient-to-r text-white font-normal text-md text-center p-2 from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 w-full h-12 rounded-xl">
                            SIGN IN
                        </button>
                        <a className="mt-1 text-Text_blue underline text-sm float-right mr-1" onClick={this.props.navigate} value="../forgotPassword"> Forgot password?</a>
                    </div>
                    <div className="text-center">
                        <hr className="mt-14"/>
                        <p className="text-xs text-gray-400 m-8">Need an account? <a className="text-Text_blue ml-1 underline text-xs" onClick={this.props.navigate} value="../register"> Signup</a> </p>
                    </div>
                </div>
            </div>          
        </div>
    </section>



    )
    }
}
export default WithRouter(LoginComp);
