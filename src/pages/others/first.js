import React from "react";
import { WithRouter } from "components/routingWrapper.js";
import 'assets/styles/first.scss';

class FirstComp extends React.Component{
    constructor(props){
        super(props)
        this.getStarted = this.getStarted.bind(this);
        this.loadToDashboard = this.loadToDashboard.bind(this)
    }
    getStarted(){
        let result = localStorage.getItem('id')
        if(result) {
            this.props.navigate("./dashboard")
            return 
        }
        return this.props.navigate("./login");
    }
    loadToDashboard(){
        if(localStorage.getItem('id')) {
            this.props.navigate("./dashboard")
            return 
        }
    }
    render(){
        return(
            <section id="getStartedPage" >
            <div id="logoDiv">
                <img id="logoImg" src={require("assets/images/VITTAE.png")} alt="Vittae official logo" />
            </div>

            <div id="charImgDiv">
                <img src={require("assets/images/sampleavatar.png")} alt="Vittae official logo" />
                <p id="p1">If we can look at something with words and sentences, explore it. VITTAE X</p>
            </div>

            <button id="Button" onClick={this.getStarted}  >
                Get Started
            </button>
            </section>
        )
    };
};

export default WithRouter(FirstComp);
