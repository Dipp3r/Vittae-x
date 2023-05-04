import React from "react";
import { WithRouter } from "../routingWrapper";
import backbutton from "../images/back_white.svg";
import info from '../images/infoGrey.svg';
import '../styles/renumeration.css';
class RenumerationComp extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section id="renumerationPg">
                <nav id="nav">
                    <button><img src={backbutton} alt="back_icon"/></button>
                    <div>
                        <p id="title">Total earnings</p>
                    </div>
                </nav>
                <div id="main">
                    <div class="renuCard">
                        <div class="firstPortion">
                            <p class="greyThin">Total Earnings</p>
                            <p class="amount">₹800.5</p>
                        </div>
                        <div class="secondPortion">
                            <div class="c1">
                                <div class="greyThin row">
                                    <p>Onboarding Commissions</p>
                                    <button><img src={info} alt="info" /></button>
                                </div>
                                <p class="amount commission">₹500</p>
                            </div>
                            <div class="c1">
                                <div class="greyThin row">
                                    <p>Investment Commissions</p>
                                    <button><img src={info} alt="info" /></button>
                                </div>
                                <p class="amount commission">₹300.5</p>
                            </div>
                        </div>
                        <div class="info info1">
                            <p>You will receive this amount once your referral starts an SIP </p>
                        </div>
                        <div class="info info2">
                            <p>You will receive 20% revenue share on every transaction made by your customer </p>
                        </div>
                    </div>
                    <p id="note">*Note - Your earnings will be credited to you on the 9th of every month as per our settlement cycle</p>
                </div>
            </section>
        )
    }
}

export default WithRouter(RenumerationComp)