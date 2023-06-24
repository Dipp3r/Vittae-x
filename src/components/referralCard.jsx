import React from "react";
import PropTypes from "prop-types";
class ReferralCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return !this.props.isEmptyCard ? (
      <div className="referralCard">
        <p id="name">{this.props.name}</p>
        <p>{this.props.phone}</p>
        {this.props.isSipStarted ? (
          <div id="sipStarted">
            <p>SIP Started</p>
          </div>
        ) : (
          <div id="sipInProcess"></div>
        )}
      </div>
    ) : (
      <p id="emptyReferralCard">
        {this.props.isSipStarted
          ? "No referrals initiated yet."
          : "No referrals in progress."}
      </p>
    );
  }
}

ReferralCard.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.number.isRequired,
  isSipStarted: PropTypes.bool.isRequired,
  isEmptyCard: PropTypes.bool,
};

export default ReferralCard;
