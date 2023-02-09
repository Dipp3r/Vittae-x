import React from "react"
import OTPComp from "./OTP"
import { WithRouter } from "./routingWrapper"

class EmailComp extends OTPComp {
    constructor(props){
        super(props)
        this.txt= 'mail:example@mail.com'
        this.anchorTags = <a className="text-Text_blue underline" onClick={this.props.navigate} value="../mobileOTP" > Try using mobile </a>
        this.loc = '../home'
    }
}

export default WithRouter(EmailComp)
export default WithRouter(EmailComp)