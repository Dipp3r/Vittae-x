import React from "react";
import { WithRouter } from "../routingWrapper";

class CustomerView extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1> customer View </h1>
            </div>
        )
    }
}

export default WithRouter(CustomerView)