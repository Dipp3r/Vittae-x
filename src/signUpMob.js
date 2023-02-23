import React from "react"
import MobComp from "./mobComp"
import { WithRouter } from "./routingWrapper"

class SignUpMobComp extends MobComp {
    constructor(props){
        super(props)
        this.loc = '../signUpOTP'
        this.submitLink = 'verifyID'
        this.title = 'Sign up'
        this.setItem = this.props.setItem
    }
}


export default WithRouter(SignUpMobComp);