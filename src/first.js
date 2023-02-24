import React from "react";
import { WithRouter } from "./routingWrapper";

class FirstComp extends React.Component{
    constructor(props){
        super(props)
        this.getStarted = this.getStarted.bind(this);
    }
    getStarted(){
        this.props.navigate("./dashboard")
        return
        fetch('/signIn',{
            method:'GET'
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)

            if(data.status == true){
                this.props.navigate("./dashboard")
            }else{
                this.props.navigate("./login")
            }
        })
    }
    render(){
        return(
            <section id="getStartedPage">
            <div id="logoDiv">
                <img id="logoImg" src={require("./images/VITTAE.png")} alt="Vittae official logo" />
            </div>

            <div id="charImgDiv">
                <img src={require("./images/sampleavatar.png")} alt="Vittae official logo" />
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