import React from "react";
import { WithRouter } from "../routingWrapper";

class RenumerationComp extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>renumeration page</h1>
            </div>
        )
    }
}

export default WithRouter(RenumerationComp)