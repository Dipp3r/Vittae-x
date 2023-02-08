import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class EmailComp extends OTPComp {
    constructor(props){
        super(props)
    }
}

export default WithRouter(EmailComp)