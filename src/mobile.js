import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class MobileComp extends OTPComp{
    constructor(props){
        super(props)
        console.log("hello")
    }
    
}

export default WithRouter(MobileComp) 