import React from "react";
import PropTypes from "prop-types";

import { WithRouter } from "@components/routingWrapper";
import "@assets/styles/first.scss";
import vittaeLogo from "@assets/images/VITTAE.png";
import avatar from "@assets/images/sampleavatar.png";
class FirstComp extends React.Component {
  constructor(props) {
    super(props);
    this.getStarted = this.getStarted.bind(this);
    this.loadToDashboard = this.loadToDashboard.bind(this);
  }
  getStarted() {
    let result = localStorage.getItem("id");
    if (result) {
      this.props.navigate("./dashboard");
      return;
    }
    return this.props.navigate("./login");
  }
  loadToDashboard() {
    if (localStorage.getItem("id")) {
      this.props.navigate("./dashboard");
      return;
    }
  }
  render() {
    return (
      <section id="getStartedPage">
        <div id="logoDiv">
          <img id="logoImg" src={vittaeLogo} alt="Vittae official logo" />
        </div>

        <div id="charImgDiv">
          <img src={avatar} alt="Vittae official logo" />
          <p id="p1">
            If we can look at something with words and sentences, explore it.
            VITTAE X
          </p>
        </div>

        <button id="Button" onClick={this.getStarted}>
          Get Started
        </button>
      </section>
    );
  }
}
FirstComp.propTypes = {
  navigate: PropTypes.func.isRequired,
};
export default WithRouter(FirstComp);
