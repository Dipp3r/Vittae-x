import React from "react";
import MobComp from "./mobComp";
import { WithRouter } from "./routingWrapper";
import checkString from "./stringChecker";

class ForgotPassword extends MobComp{
    constructor(props){
        super(props)
        this.state = {}
        this.submitLink = 'verifyID'
        this.loc = '../forgotOTP'
        this.title = 'Find Your Profile'
        this.setItem = this.props.setItem
    }
}

export default WithRouter(ForgotPassword);