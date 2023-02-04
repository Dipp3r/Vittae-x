import React from 'react';
import ReactDOM from 'react-dom/client';
import checkString from './stringChecker';

class LoginComp extends React.Component{
    constructor(){
        super()
        this.state = {userName:'',password:'',message:''}
        this.changeInVal = this.changeInVal.bind(this)
        this.sendLoginData = this.sendLoginData.bind(this)
    }
    changeInVal(e){
        var obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    } 
    sendLoginData(e){
        if(this.state.userName == '' | this.state.password == ''){
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
                case 0:
                    string = 'not yet registered!!!'
                    break;
                case 1:
                    string = 'successfully logged in!'
                    window.location.replace("./main")
                    break;
                case 2:
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
    <section>
        <nav className="w-full h-16 py-3 px-4 align-center bg-white rounded-b-xl shadow-md fixed">
        <img src={require("./images/VITTAE_logo.png")} alt="vittae logo" class="h-10"/>
        </nav>
        <div className="flex justify-center items-center h-screen">        
            <div id='loginMain' className="text-xl bg-_blue/90 p-5 w-60 md:w-1/2 xl:w-1/4 h-72 rounded-xl transition-colors backdrop-blur-xl text-center font-bold  bg-clip-padding backdrop-filter z-50 smooth-effect 'style'=z-index:100 shadow-xl">
                <div className='inputBox'>
                    <h3>Login Form</h3>
                    <input type='text' placeholder='Enter your user name' name='userName' onChange={this.changeInVal} maxLength='50' className="hover:scale-110 transition transform duration-500 w-4/5 md:w-1/2 rounded-full bg-white/70 font-thin text-center text-md text-black px-3 border border-gray-500"/>
                    <input type='password' placeholder='Enter your password' name='password' onChange={this.changeInVal} minLength='4' maxLength='30' className="hover:scale-110 transition transform duration-500 w-4/5 md:w-1/2 rounded-full bg-white/70 font-thin text-center text-md text-black px-3 border border-gray-500"/>
                    <p>{this.state.message}</p>
                </div>
                <div className='buttonBox'>
                    <button onClick={this.sendLoginData} className="bg-white/70 h-8 duration-500 w-20 md:p-1 text-sm md:text-md hover:shadow-md hover:text-black/70 hover:scale-95 text-gray-600 rounded-xl">submit</button>
                </div>
                <div>
                    <p>Text here</p>
                    <button value={2} onClick={this.props.changeStage} className="bg-white/70 h-8 duration-500 w-20 md:p-1 text-sm md:text-md hover:shadow-md hover:text-black/70 hover:scale-95 text-gray-600 rounded-xl">sign-up</button>
                </div>
            </div>
        </div>
    </section>
    )
    }
}
export default LoginComp;
