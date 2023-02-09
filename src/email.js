import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class EmailComp extends OTPComp {
    constructor(props){
        super(props)
        this.props.text= 'mail:example@mail.com'
        this.props.anchorTags = <a className="text-Text_blue underline" onClick={this.props.navigate} value="../mobileOTP" > Try using mobile </a>
    }
}

export default WithRouter(EmailComp)