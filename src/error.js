import React from "react";
import error from "./images/error.png"
class ErrorComp extends React.Component{
    render(){
        return(
        <section id="error">
            <img src={error} alt="error404"/>
        </section>
        )
    }
}

export default ErrorComp