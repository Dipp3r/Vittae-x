import React from "react"
import MobComp from "./mobComp"
import { WithRouter } from "./routingWrapper"
import './styles/mobComp.css';

class SignUpMobComp extends MobComp {
    constructor(props){
        super(props)
        this.loc = '../signUpOTP'
        // this.submitLink = ''
        this.title = 'Sign up'
        this.setItem = this.props.setItem
    }
    process(data){
        this.props.navigate(this.loc)
    }
}


export default WithRouter(SignUpMobComp);