import React from "react";
import PropTypes from "prop-types";

import { WithRouter } from "@components/routingWrapper";
import ContactsComp from "@pages/dashboard/contacts/contact";
import HomeComp from "@pages/dashboard/home/home";

import "@assets/styles/home.scss";
import "@assets/styles/contact.scss";
import HelpLineIcon from "@components/helpLineIcon";
import NotificationIcon from "@components/notificationIcon";

class DashboardComp extends React.Component {
  constructor() {
    super();
    this.state = {
      isHome: true,
    };

    this.changeInVal = this.changeInVal.bind(this);
    this.toggleHomeContacts = this.toggleHomeContacts.bind(this);
  }
  changeInVal(e) {
    let obj = {};
    obj[e.target.name] = e.target.value.trim();
    this.setState(obj);
  }
  toggleHomeContacts(e) {
    // //console.log(e.currentTarget.getAttribute("value"))
    this.setState(
      { isHome: e.currentTarget.getAttribute("value") === "true" },
      () => {
        this.props.setItem({ dashboard: this.state });
      }
    );
  }
  componentDidMount() {
    this.setState(this.props.getItem("dashboard"));
    // //console.log()
  }
  render() {
    return (
      <section id="dashboard">
        <nav className="navbar">
          <button
            className="profile"
            onClick={this.props.navigate}
            value="../profile"
          >
            <p id="profileName">{`${localStorage
              .getItem("first_name")[0]
              .toUpperCase()}${localStorage
              .getItem("last_name")[0]
              .toUpperCase()}`}</p>
          </button>

          <div className="icons">
            <HelpLineIcon />
            <NotificationIcon />
          </div>
        </nav>

        <div id="main">
          {this.state.isHome ? (
            <HomeComp
              getItem={this.props.getItem}
              setItem={this.props.setItem}
            />
          ) : (
            <ContactsComp
              getItem={this.props.getItem}
              setItem={this.props.setItem}
            />
          )}
          <div className="fixed">
            <div
              className={this.state.isHome ? "downIconDivClick" : "downIconDiv"}
              onClick={this.toggleHomeContacts}
              value="true"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.6665 17.0128C6.6665 15.2025 6.6665 14.2973 7.03245 13.5017C7.3984 12.706 8.08566 12.1169 9.46017 10.9388L10.7935 9.79591C13.2779 7.66641 14.5201 6.60165 15.9998 6.60165C17.4795 6.60165 18.7217 7.66641 21.2062 9.79591L22.5395 10.9388C23.914 12.1169 24.6013 12.706 24.9672 13.5017C25.3332 14.2973 25.3332 15.2025 25.3332 17.0128V22.6667C25.3332 25.1808 25.3332 26.4379 24.5521 27.219C23.7711 28 22.514 28 19.9998 28H11.9998C9.48568 28 8.2286 28 7.44755 27.219C6.6665 26.4379 6.6665 25.1808 6.6665 22.6667V17.0128Z"
                  stroke="#223F80"
                  strokeWidth="2"
                />
                <path
                  d="M19.3332 28V21C19.3332 20.4477 18.8855 20 18.3332 20H13.6665C13.1142 20 12.6665 20.4477 12.6665 21V28"
                  stroke="#223F80"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Home</p>
            </div>

            <div
              className={
                !this.state.isHome ? "downIconDivClick" : "downIconDiv"
              }
              onClick={this.toggleHomeContacts}
              value="false"
            >
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="14.5"
                  cy="12.0833"
                  r="3.625"
                  stroke="#223F80"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="14.5"
                  cy="14.5"
                  r="10.875"
                  stroke="#223F80"
                  strokeWidth="2"
                />
                <path
                  d="M21.75 22.603C21.3224 21.3183 20.3801 20.1831 19.0692 19.3735C17.7584 18.5639 16.1523 18.125 14.5 18.125C12.8477 18.125 11.2416 18.5639 9.93079 19.3735C8.61995 20.1831 7.67764 21.3183 7.25 22.603"
                  stroke="#223F80"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p>Contacts</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

DashboardComp.propTypes = {
  setItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default WithRouter(DashboardComp);
