import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class MobileComp extends OTPComp{
    constructor(props){
        super(props)
        this.txt= "mobile:+919123456780" 
        this.anchorTags = <a className="text-Text_blue underline" onClick={this.props.navigate} value="../mailOTP"> Try using Email </a>
        this.loc = '../home'
    }
    
}

export default WithRouter(MobileComp) 
