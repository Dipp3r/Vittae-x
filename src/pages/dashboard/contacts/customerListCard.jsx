import React from "react";
import PropTypes from "prop-types";

import dateToString from "@utils/dateToString";
import { WithRouter } from "@components/routingWrapper";
class CustomerListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusBackgroundColor: this.props.color,
      name: this.props.name,
      phone: this.props.phone,
      date: dateToString(new Date(this.props.createdat)).replace(/ /g, "/"),
      id: this.props.id,
    };
    this.openCustomerView = this.openCustomerView.bind(this);
  }
  openCustomerView() {
    localStorage.setItem("currentCustomerViewId", this.state.id);
    this.props.setItem({ currentCustomerView: this.state }, () => {
      this.props.navigate("../customerview");
    });
  }
  render() {
    return (
      <button className="cards" onClick={this.openCustomerView}>
        <div className="details">
          <div className="info" id="name">
            {this.state.name.length > 10
              ? this.state.name.slice(0, 7) + "..."
              : this.state.name}
          </div>
          <div className="info" id="mobile">
            {this.state.phone}
          </div>
          <div
            className="info status"
            id="status"
            style={{ backgroundColor: this.state.statusBackgroundColor }}
          ></div>
          <div className="info dateDiv">
            <div className="filterTag"></div>
            <p className="date" id="date">
              {this.state.date}
            </p>
          </div>
        </div>
      </button>
    );
  }
}

CustomerListCard.propTypes = {
  id: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.number.isRequired,
  createdat: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
export default WithRouter(CustomerListCard);
