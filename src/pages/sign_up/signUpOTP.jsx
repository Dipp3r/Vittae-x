// import React from "react"
import OTPComp from "@components/OTP"
import { WithRouter } from "@components/routingWrapper"

class SingUpOTP extends OTPComp {
    constructor(props){
        super(props)
        this.txt = '+911234567890'
        this.loc = '../register'
    }
}

export default WithRouter(SingUpOTP)