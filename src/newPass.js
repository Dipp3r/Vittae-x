import React from "react";
import { WithRouter } from "./routingWrapper";
import checkString from "./stringChecker";

class NewPassComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {password:'',cPassword:''}
        this.submitLink = 'setNewPassword'
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
    }
    changeInVal(e){
        var obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    }
    submit(){
        if(this.state.password == '') return
        if(!checkString(this.state.password,2)) return
        if(this.state.password !== this.state.cPassword){
            this.setState({cPassword:""})
            return
        }
        var obj = {password:this.state.password}
        //sending data to the server
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((data)=>{
            if(data.status) this.props.navigate("../login")
        })
    }
    render(){
        return(
<section className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 pt-20 pb-20 p-6">
    <div className="bg-white max-w-sm rounded-2xl w-full shadow-2xl">
        <div className="p-8 pt-4 pb-4 mt-4 text-center">
            <p className="heading text-Text_blue text-xl">CREATE A STRONG PASSWORD</p>
        </div>
        <div>
            <div className="bg-white m-8 mt-0 mb-0 rounded-b-xl">
                
                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Password</p>
                    <div className="flex-row flex border-2 border-border_gray rounded-md">
                        <input type="password" onChange={this.changeInVal} name="password" placeholder="Example!123" value={this.state.password} className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} className="m-2" alt="eye icon"/>
                    </div>
                </div>

                <div className="pt-3">
                    <p className="text-Text_blue text-sm p-2">Confirm password</p>
                    <div className="flex-row flex border-2 border-border_gray rounded-md">
                        <input type="password" onChange={this.changeInVal} name="cPassword" value={this.state.cPassword}  placeholder="Example!123" className="password font-thin rounded-md p-2 w-full"/>
                        <img id="" src={require("./images/eye.svg")} className="m-2" alt="eye icon"/>
                    </div>
                </div>
                
                <div className="mt-12 mb-14">
                    <button onClick={this.submit}  type="submit" className="button bg-gradient-to-r text-white font-normal text-md text-center p-2 from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 w-full h-12 rounded-xl">
                        SIGN IN
                    </button>
                </div>
            </div>
        </div>          
    </div>
</section>
        )
    };
};

export default WithRouter(NewPassComp);