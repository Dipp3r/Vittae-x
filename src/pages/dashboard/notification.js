import React from "react";
import { WithRouter } from "components/routingWrapper.js";
// import { WithRouter } from "../routingWrapper";
import "assets/styles/notification.scss";

class NotificationComp extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section id="notifPg">
                <nav id="navbar">
                    <p>Notification</p>
                </nav>
                <div id="main">
                    <div class="notifCard">
                        <p>Deekay’s SIP had been started</p>
                    </div>
                    <div class="notifCard">
                        <p>Deekay’s KYC Completed</p>
                    </div>
                    <div class="notifCard read">
                        <p>Narayanan’s SIP had been started</p>
                    </div>
                    <div class="notifCard read">
                        <p>Narayanan’s KYC Completed</p>
                    </div>
                    <div class="notifCard">
                        <p>Narayanan’s SIP had been started</p>
                    </div>
                    <div class="notifCard read">
                        <p>Narayanan’s KYC Completed</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default  WithRouter(NotificationComp)