import React from "react";
import { WithRouter } from "../routingWrapper";

class Tasks extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <section id='tasks'>
                <h1>tasks HERE</h1>
            </section>
        )
    }
}

export default WithRouter(Tasks)