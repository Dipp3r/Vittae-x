import React from "react";
import { WithRouter } from "../routingWrapper";
import "../styles/incentive.css";
import gift from "../images/incentive.jpg" ;
import gift1 from "../images/incentive1.webp";
import gift2 from "../images/incentive2.webp";
import gift3 from "../images/incentive3.png";
import gift4 from "../images/incentive4.jpeg";

class IncentiveComp extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section id="incentivePg">
                <div id="main">
                    <div class="incentiveCard">
                        <div class="imgBox"><img src={gift1} alt="gift"/></div>
                        <div class="unlock"><p>Unlock 🎉</p></div>
                    </div>
                    <div class="incentiveCard">
                        <div class="imgBox"><img src={gift} alt="gift"/></div>
                        <div class="unlock"><p>Unlock 🎉</p></div>
                    </div>
                    <div class="incentiveCard">
                        <div class="imgBox"><img src={gift2} alt="gift"/></div>
                        <div class="unlock"><p>Unlock 🎉</p></div>
                    </div>
                    <div class="incentiveCard">
                        <div class="imgBox"><img src={gift3} alt="gift"/></div>
                        <div class="unlock"><p>Unlock 🎉</p></div>
                    </div>
                    <div class="incentiveCard">
                        <div class="imgBox"><img src={gift4} alt="gift"/></div>
                        <div class="unlock"><p>Unlock 🎉</p></div>
                    </div>
                </div>
            </section>
        )
    }
}

export default WithRouter(IncentiveComp)