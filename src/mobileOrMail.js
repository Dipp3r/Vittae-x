import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class mobileOrMailOTP extends OTPComp {
    constructor(props){
        super(props)
        if(localStorage.getItem('typeId') == 0){
            this.txt = `mail:${localStorage.getItem('mail')}`
        }else{
            this.txt = `mobile:${localStorage.getItem('mobile')}`
        }
        this.anchorTags = ""
        this.loc = '../newPass'
    }
}

export default WithRouter(mobileOrMailOTP)