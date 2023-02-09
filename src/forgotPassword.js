import React from "react";
import { WithRouter } from "./routingWrapper";

class ForgotPassword extends React.Component{
    render(){
        return(       
        <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-Vittae_Blue/90 to-Vittae_Red/90 via-Vittae_Violet/90 pt-20 pb-20 p-6">
            <div className="bg-white max-w-sm rounded-2xl w-full shadow-2xl">
                <div className="p-8 pt-4 pb-4">
                    <p className="heading text-Text_blue text-xl">FIND YOUR PROFILE</p>
                </div>
                <div>
                    <div className="bg-white m-8 mt-0 mb-0 rounded-b-xl">
                        
                        <div className="mt-4">
                            <p className="text-Text_blue text-sm p-2">Email or phone number</p>
                            <input type="text" placeholder="example@gmail.com" className=" font-thin rounded-md p-2 w-full"/>
                        </div>
                        
                        <button className="button" onClick={this.props.navigate} value='../mobileOrMailOTP'>
                            SIGN IN
                        </button>
                    </div>
                </div>          
            </div>
        </section> 
        )
    }
}

export default WithRouter(ForgotPassword);