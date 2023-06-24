import React from "react";
import { WithRouter } from "@components/routingWrapper";
import "@assets/styles/incentive.scss";
import backbutton from "@assets/images/back_white.svg";
import ReferralCard from "@components/referralCard";

class ReferralComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sip_in_process_count: 0,
      sip_starts_count: 0,
      inProcess: [],
      started: [],
      isSipStartedListDisplayed: "false",
    };
  }
  init = () => {
    fetch(import.meta.env.VITE_BASE_SERVER_URL + "/broker-referrals/", {
      method: "GET",
      headers: {
        Authorization: `Passcode ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
        Connection: "keep-alive",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.inProcess = [];
        data.started = [];
        data.sip_in_process.forEach((element) => {
          data.inProcess.push(
            <ReferralCard
              isSipStarted={false}
              name={element.name}
              phone={element.phone}
            />
          );
        });
        data.sip_starts.forEach((element) => {
          data.started.push(
            <ReferralCard
              isSipStarted={true}
              name={element.name}
              phone={element.phone}
            />
          );
        });
        this.setState(data);
      });
  };
  toggleListPage = (event) => {
    let buttons = document.body.querySelectorAll(".topButton");
    let target = event.currentTarget;
    if (target.value == "true") {
      buttons[0].style.borderBottomColor = "rgba(37,53,100,.4)";
      buttons[1].style.borderBottomColor = "rgb(34, 63, 128)";
    } else {
      buttons[1].style.borderBottomColor = "rgba(37,53,100,.4)";
      buttons[0].style.borderBottomColor = "rgb(34, 63, 128)";
    }
    this.setState({ isSipStartedListDisplayed: target.value });
  };
  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <section id="incentivePg">
        <nav id="nav">
          <button>
            <img
              src={backbutton}
              alt="back_icon"
              // eslint-disable-next-line react/prop-types
              onClick={() => this.props.navigate("../dashboard")}
            />
          </button>
          <div>
            <p id="title">Number of Referrals</p>
          </div>
        </nav>
        <div id="main">
          <div id="top">
            <button
              className="topButton"
              value="false"
              onClick={this.toggleListPage}
              style={{ borderBottomColor: "rgb(34, 63, 128)" }}
            >
              <p>({this.state.sip_in_process_count})</p>
              <p>SIPs in process</p>
            </button>
            <button
              className="topButton"
              value="true"
              onClick={this.toggleListPage}
            >
              <p>({this.state.sip_starts_count})</p>
              <p>SIPs started</p>
            </button>
          </div>
          {this.state.isSipStartedListDisplayed == "true"
            ? this.state.started.map((element) => {
                return element;
              })
            : this.state.inProcess.map((element) => {
                return element;
              })}
        </div>
      </section>
    );
  }
}

export default WithRouter(ReferralComp);
