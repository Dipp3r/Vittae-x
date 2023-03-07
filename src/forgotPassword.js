import React from "react";
import MobComp from "./mobComp";
import { WithRouter } from "./routingWrapper";
import checkString from "./stringChecker";

class ForgotPassword extends MobComp{
    constructor(props){
        super(props)
        this.state = {}
        this.loc = '../forgotOTP'
        this.title = 'Find Your Profile'
        
    }
    process(data){
        if(data.old_user){
            //registered user
            this.props.navigate(this.loc)
        }else{
            //unregistered user
        }
    }
}

export default WithRouter(ForgotPassword);