import React from "react";
import { WithRouter } from "@components/routingWrapper";
import "@assets/styles/incentive.scss";
import backbutton from '@assets/images/back_white.svg';

class IncentiveComp extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section id="incentivePg">
                <nav id="nav">
                    <button><img src={backbutton} alt="back_icon" onClick={ ()=>this.props.navigate("../dashboard")}/></button>
                    <div>
                        <p id="title">Number of Referrals</p>
                    </div>
                </nav>
                <div id="main">
                    <div id="top">
                        <button class="topButton">
                            <p>(70)</p>
                            <p>SIPs in process</p>
                        </button>
                        <button class="topButton">
                            <p>(20)</p>
                            <p>SIPs started</p>
                        </button>
                    </div>
                    <div class="referralCard">
                        <p id="name">Deekay</p>
                        <p>9489642356</p>
                        <div id="sipInProcess"></div>
                        <div id="sipStarted">
                            <p>SIP Started</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default WithRouter(IncentiveComp)