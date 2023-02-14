import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect ,useNavigate} from 'react-router-dom';
import { WithRouter } from './routingWrapper';
import checkString from './stringChecker';

class LoginComp extends React.Component{
    constructor(){
        super()
        this.state = {type:'',password:'',typeErr:'',passwordErr:'',passwordInType:'password',rememberMe:true}
        this.submitLink = 'signIn'
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.changePasswordVis = this.changePasswordVis.bind(this)
        this.changeRememberMe = this.changeRememberMe.bind(this)
    }   
    changeInVal(e){
        let obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    } 
    changePasswordVis(e){
        let passIn = document.body.querySelectorAll('#signInPasswordIn')
        if(this.state.passwordInType == 'password'){
            this.setState({passwordInType:'text'})
        }else{
            this.setState({passwordInType:'password'})
        }
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
        let typeId = 0
        let checkRes = checkString(this.state.password,1) 
        if(!checkRes.bool){
            this.setState({passwordErr:checkRes.msg})
            isErr = true
        }else{
            this.setState({passwordErr:""})
        }
        checkRes = checkString(this.state.type,2)
        if(/[a-zA-Z]+/.test(this.state.type)){
            typeId = 0
            checkRes = checkString(this.state.type,2)
            if(!checkRes.bool){
                this.setState({typeErr:checkRes.msg})
                isErr = true
            }else{
                this.setState({typeErr:""})
            }
        }else{
            typeId = 1
            checkRes = checkString(this.state.type,3)
            if(!checkRes.bool){
                this.setState({typeErr:checkRes.msg})
                isErr = true
            }else{
                this.setState({typeErr:""})
            }
        }
        
        if((this.state.type == '' || this.state.password == '')||(this.state.typeErr != '' || this.state.passwordErr != '')) return
        let obj = {
            typeId:typeId,
            type:this.state.type,
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
                this.props.navigate("../home")
            }
        })
    }
    render(){
        console.log(this.state)
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
                        <input type="text" onChange={this.changeInVal} placeholder="example@gmail.com" name='type' className=" font-thin rounded-md p-2 w-full"/>
                        <p id="typeErr" class="text-Text_blue text-xs ml-3 text-red-700">{this.state.typeErr}</p>
                    </div>

                    <div className="pt-5">
                        <p className="text-Text_blue text-sm p-2">Password</p>
                        <div className="flex-row flex border-2 border-border_gray rounded-md">
                            <input id='signInPasswordIn' type={this.state.passwordInType} onChange={this.changeInVal}  placeholder="Example123" name='password' className="password font-thin rounded-md p-2 w-full"/>
                            <img  src={require("./images/eye.svg")} onClick={this.changePasswordVis} className="m-2" alt="eye icon"/>
                        </div>
                        <p id="passwordErr" class="text-Text_blue text-xs ml-3 text-red-700">{this.state.passwordErr}</p>
                    </div>
                    <div class="tickBox ">
                        <button value="0" class="tickButton" onClick={this.changeRememberMe} id='rememberMeBox'>
                            <svg width="12" height="10" viewBox="0 0 15 14" fill="none">
                                <path d="M1.5 8L6.5 12.5L13.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <p  class="text-Text_blue"> Remember me</p>
                    </div>
                    
                    <div className="mt-1">
                        <button id="button" style={{"margin":"0px"}} onClick={this.submit} value="./register" className="button bg-gradient-to-r text-white font-normal text-md text-center p-2 from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 w-full h-12 rounded-xl">
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
