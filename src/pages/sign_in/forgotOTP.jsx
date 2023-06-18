// import React from "react"
import OTPComp from "@components/OTP"
import { WithRouter } from "@components/routingWrapper"

class MobileComp extends OTPComp{
    constructor(props){
        super(props)
        this.type = 0
        this.txt= "+919123456780"
        this.loc = '../newPass'
    }
    
}

export default WithRouter(MobileComp) 
