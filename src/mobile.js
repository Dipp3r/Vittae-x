import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class MobileComp extends OTPComp{
    constructor(props){
        super(props)
        this.props.text= "mobile:+91 9123456780" 
        this.props.anchorTags = <a className="text-Text_blue underline" onClick={this.props.navigate} value="../mailOTP"> Try using Email </a>
    
    }
    
}

export default WithRouter(MobileComp) 