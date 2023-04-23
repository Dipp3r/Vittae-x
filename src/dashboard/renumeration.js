import React from "react";
import { WithRouter } from "../routingWrapper";

class RenumerationComp extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section>
                <h1>renumeration page</h1>
                <p>commming soon</p>
            </section>
        )
    }
}

export default WithRouter(RenumerationComp)