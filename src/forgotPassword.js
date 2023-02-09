import React from "react";
import { WithRouter } from "./routingWrapper";

class ForgotPassword extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>forgotPassword</div>
        )
    }
}

export default WithRouter(ForgotPassword)