import React from "react";
import { WithRouter } from "../routingWrapper";

class MonthlyView extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>this is the monthly view</h1>
            </div>
        )
    }
}

export default WithRouter(MonthlyView)