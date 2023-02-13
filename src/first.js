import React from "react";
import { WithRouter } from "./routingWrapper";

class FirstComp extends React.Component{
    constructor(props){
        super(props)
        this.getStarted = this.getStarted.bind(this);
    }
    getStarted(){
        fetch('/signIn',{
            method:'GET'
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)

            if(data.status == true){
                this.props.navigate("./home")
            }else{
                this.props.navigate("./login")
            }
        })
    }
    render(){
        return(
            <section className="flex flex-col h-screen justify-center items-center">
                <div id="logo" className="pt-20 mb-10 mt-4">
                    <img src={require("./images/VITTAE.png")} alt="Vittae official logo" className="h-28"/>
                </div>

                <div id="image" className="pt-10 items-center justify-center flex-col flex">
                    <img src={require("./images/sampleavatar.png")} alt="Vittae official logo"/>
                    <p id="p1" className="text-center text-text_blue mb-6">If we can look at something with words and sentences, explore it. VITTAE X</p>
                </div>

                <div id="getstarted" className="mb-12  hover:scale-95 duration-500 transition-transform">
                    <button onClick={this.getStarted} style={{"width":"260px","margin-top":"10px"}}  className="button">
                        Get Started
                    </button>
                </div>
            </section>
        )
    };
};

export default WithRouter(FirstComp);