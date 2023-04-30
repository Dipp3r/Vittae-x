import React from "react";
import { WithRouter } from "../routingWrapper";
// import { WithRouter } from "../routingWrapper";

class NotificationComp extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section>
                <h1>notification page</h1>
                <p>comming soon</p>
            </section>
        )
    }
}

export default  WithRouter(NotificationComp)