import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class mobileOrMailOTP extends OTPComp {
    constructor(props){
        super(props)
        this.txt= 'mail:example@mail.com'
        this.anchorTags = ""
        this.loc = '../newPass'
    }
}

export default WithRouter(mobileOrMailOTP)