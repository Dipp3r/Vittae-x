import React from "react";
import { WithRouter } from "./routingWrapper";

class FirstComp extends React.Component{
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
                    <button onClick={this.props.navigate} value="./login" className="button bg-gradient-to-r text-white text-center p-2 from-Vittae_Blue to-Vittae_Red via-Vittae_Violet rounded-xl">
                        Get Started
                    </button>
                </div>
            </section>
        )
    };
};

export default WithRouter(FirstComp);