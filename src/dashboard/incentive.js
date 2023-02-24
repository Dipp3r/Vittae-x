import React from "react";
import { WithRouter } from "../routingWrapper";

class IncentiveComp extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>incentive page</h1>
            </div>
        )
    }
}

export default WithRouter(IncentiveComp)