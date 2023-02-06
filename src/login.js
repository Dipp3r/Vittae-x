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
        this.changeRoute = this.changeRoute.bind(this)
    }
    changeInVal(e){
        var obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    } 
    changeRoute(e){
        var URL = ''
        if (typeof(e) == 'string'){
            URL = e
        }else{
            URL = e.target.value
        }
        this.props.navigate(URL)
    }
    sendLoginData(e){
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
                    this.changeRoute("./home")
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
                            <img id="" src="../static/images/eye.svg" className="m-2" alt="eye icon"/>
                        </div>
                    </div>
                    <div className="pl-3 mt-1">
                        <input type="checkbox" id="rember_me"/>
                        <label for="remember_me" className="text-Text_blue"> Remember me</label>
                    </div>
                    
                    <div className="mt-8">
                        <button id="button" className="bg-gradient-to-r text-white font-normal text-md text-center p-2 from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 w-full h-12 rounded-xl">
                            SIGN IN
                        </button>
                        <p className="mt-1 text-Text_blue underline text-sm float-right mr-1"> Forgot password?</p>
                    </div>
                    <div className="text-center">
                        <hr className="bg-black mt-14 text-sm"/>
                        <p className="text-xs text-gray-400 m-8">Need an account? <a className="text-Text_blue ml-1 underline text-xs"> Signup</a> </p>
                    </div>
                </div>
            </div>          
        </div>
    </section>
    )
    }
}
export default WithRouter(LoginComp);
