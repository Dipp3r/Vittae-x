import React from "react";
import PropTypes from "prop-types";

import { WithRouter } from "@components/routingWrapper";

import "@assets/styles/profile.scss";
// import profile from "../images/profile.png"
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      deleteAcc: "none",
      description: "",
    };
    this.toggleDeleteAcc = this.toggleDeleteAcc.bind(this);
    this.logOutAcc = this.logOutAcc.bind(this);
    this.changeInVal = this.changeInVal.bind(this);
    this.deleteAcc = this.deleteAcc.bind(this);
  }
  logOutAcc() {
    //console.log("logOutAcc clicked");

    this.props.setItem({ id: undefined, token: undefined }, () => {
      this.props.navigate("../login");
    });
  }
  toggleDeleteAcc() {
    //console.log("Delete account clicked");
    let display = this.state.deleteAcc;
    display = display === "none" ? "flex" : "none";
    this.setState({ deleteAcc: display });
    // this.props.navigate("../")
  }
  changeInVal(e) {
    let obj = {};
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    obj[name] = value;
    e.currentTarget.style.borderColor = "#616161";
    this.setState(obj);
  }
  deleteAcc() {
    let reason = this.state.description;
    if (reason.length === 0) {
      //console.log("no reason provided");
      let reasonTxt = document.querySelector("#reasonTxt");
      reasonTxt.style.borderColor = "red";
      return;
    }
    fetch(import.meta.env.VITE_BASE_SERVER_URL + `/agent-profile-delete/`, {
      method: "POST",
      headers: {
        Authorization: `Passcode ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
        Connection: "keep-alive",
      },
    }).then((response) => {
      if (response.status === 200) {
        localStorage.clear();
        this.props.navigate("../");
      }
      return;
    });
  }
  componentDidMount() {
    let first_name = localStorage.getItem("first_name");
    // let last_name = localStorage.getItem('last_name')
    // last_name = last_name === null?'':last_name;
    this.setState({ first_name: first_name });
  }
  render() {
    // //console.log(first_name)
    return (
      <section id="profile">
        <div id="deleteAcc" style={{ display: this.state.deleteAcc }}>
          <div id="deleteAccDiv">
            <button id="closeIcon" onClick={this.toggleDeleteAcc}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="#7B86A7"
                  fillOpacity="0.25"
                />
                <path
                  d="M16 8L8 16"
                  stroke="#222222"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8L16 16"
                  stroke="#222222"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <p>
              Reason<p>*</p>
            </p>
            <div id="reasonBoxDiv">
              <textarea
                id="reasonTxt"
                name="description"
                onChange={this.changeInVal}
              ></textarea>
              <button id="Button" onClick={this.deleteAcc}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div id="backButton">
          <button onClick={this.props.navigate} value="../dashboard">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path
                d="M4.1665 12.5L3.4594 11.7929L2.75229 12.5L3.4594 13.2071L4.1665 12.5ZM19.7915 13.5C20.3438 13.5 20.7915 13.0523 20.7915 12.5C20.7915 11.9477 20.3438 11.5 19.7915 11.5V13.5ZM9.7094 5.54289L3.4594 11.7929L4.87361 13.2071L11.1236 6.95711L9.7094 5.54289ZM3.4594 13.2071L9.7094 19.4571L11.1236 18.0429L4.87361 11.7929L3.4594 13.2071ZM4.1665 13.5H19.7915V11.5H4.1665V13.5Z"
                fill="black"
                fillOpacity="0.79"
              />
            </svg>
          </button>
        </div>

        <div id="profileDiv">
          <div id="profileBox">
            <p id="profileName">{`${localStorage
              .getItem("first_name")[0]
              .toUpperCase()}${localStorage
              .getItem("last_name")[0]
              .toUpperCase()}`}</p>
          </div>
          <p id="profileName">{this.state.first_name}</p>
        </div>
        <div id="profileMenu">
          <div
            className="setting"
            onClick={this.props.navigate}
            value="../profileinfo"
          >
            <p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#223F80" />
                <path
                  d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z"
                  fill="#223F80"
                />
              </svg>
              Personal Info
            </p>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1.5 1L6.5 6L1.5 11" stroke="#223F80" strokeWidth="2" />
            </svg>
          </div>

          <div
            className="setting"
            onClick={this.props.navigate}
            value="../termsAndConditions"
          >
            <p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2V7L12 7.05441C11.9999 7.47848 11.9998 7.8906 12.0455 8.23052C12.097 8.61372 12.2226 9.051 12.5858 9.41421C12.949 9.77743 13.3863 9.90295 13.7695 9.95447C14.1094 10.0002 14.5215 10.0001 14.9456 10H14.9456H14.9456H14.9456L15 10H20V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H12ZM14 2.00462V7C14 7.49967 14.0021 7.77383 14.0277 7.96402L14.0287 7.97131L14.036 7.97231C14.2262 7.99788 14.5003 8 15 8H19.9954C19.9852 7.58836 19.9525 7.31595 19.8478 7.06306C19.6955 6.69552 19.4065 6.40649 18.8284 5.82843L16.1716 3.17157C15.5935 2.59351 15.3045 2.30448 14.9369 2.15224C14.684 2.04749 14.4116 2.01481 14 2.00462ZM8 13C8 12.4477 8.44772 12 9 12L15 12C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14L9 14C8.44772 14 8 13.5523 8 13ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z"
                  fill="#223F80"
                />
              </svg>
              Legal Agreement
            </p>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1.5 1L6.5 6L1.5 11" stroke="#223F80" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div id="logOut" onClick={this.logOutAcc}>
          <p>Log out</p>
          <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
            <path
              d="M12.3333 4.33333L16.5 8.5M16.5 8.5L12.3333 12.6667M16.5 8.5H6.50001M6.50001 0.99999H3.16667C2.72464 0.99999 2.30072 1.17559 1.98816 1.48815C1.67559 1.80071 1.5 2.22463 1.5 2.66666V14.3333C1.5 14.7754 1.67559 15.1993 1.98816 15.5119C2.30072 15.8244 2.72464 16 3.16667 16H6.50001"
              stroke="#EB1414"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <button id="deleteButton" onClick={this.toggleDeleteAcc}>
          <p id="delete">Delete my account</p>
        </button>
      </section>
    );
  }
}
Profile.propTypes = {
  setItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
export default WithRouter(Profile);
