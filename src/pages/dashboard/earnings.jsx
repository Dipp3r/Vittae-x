import React from "react";
import { WithRouter } from "@components/routingWrapper";
import backbutton from "@assets/images/back_white.svg";
import info from "@assets/images/infoGrey.svg";
import "@assets/styles/renumeration.scss";
class EarningsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_earn: 0,
      investment_commission: 0,
      onboarding_commission: 0,
    };
  }
  init = () => {
    fetch(import.meta.env.VITE_BASE_SERVER_URL + "/agent-earn/", {
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
        this.setState(data);
      });
  };
  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <section id="renumerationPg">
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
            <p id="title">Total earnings</p>
          </div>
        </nav>
        <div id="main">
          <div className="renuCard">
            <div className="firstPortion">
              <p className="greyThin">Total Earnings</p>
              <p className="amount">₹{this.state.total_earn}</p>
            </div>
            <div className="secondPortion">
              <div className="c1">
                <div className="greyThin row">
                  <p>Onboarding Commissions</p>
                  <button>
                    <img
                      src={info}
                      alt="info"
                      onMouseEnter={() => {
                        document.querySelector("#info1").style.display = "flex";
                      }}
                      onMouseLeave={() => {
                        document.querySelector("#info1").style.display = "none";
                      }}
                    />
                  </button>
                </div>
                <p className="amount commission">
                  ₹{this.state.onboarding_commission}
                </p>
              </div>
              <div className="c1">
                <div className="greyThin row">
                  <p>Investment Commissions</p>
                  <button>
                    <img
                      src={info}
                      alt="info"
                      onMouseEnter={() => {
                        document.querySelector("#info2").style.display = "flex";
                      }}
                      onMouseLeave={() => {
                        document.querySelector("#info2").style.display = "none";
                      }}
                    />
                  </button>
                </div>
                <p className="amount commission">
                  ₹{this.state.investment_commission}
                </p>
              </div>
            </div>
            <div className="info info1" id="info1">
              <p>
                You will receive this amount once your referral starts an SIP{" "}
              </p>
            </div>
            <div className="info info2" id="info2">
              <p>
                You will receive 20% revenue share on every transaction made by
                your customer{" "}
              </p>
            </div>
          </div>
          <p id="note">
            *Note - Your earnings will be credited to you on the 9th of every
            month as per our settlement cycle
          </p>
        </div>
      </section>
    );
  }
}

export default WithRouter(EarningsComp);
