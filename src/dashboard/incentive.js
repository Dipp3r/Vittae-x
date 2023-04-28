import React from "react";
import { WithRouter } from "../routingWrapper";

class IncentiveComp extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section>
                <h1>incentive page</h1>
                <p>comming soon</p>
            </section>
        )
    }
}

export default WithRouter(IncentiveComp)