import React from "react";
import PropTypes from "prop-types";
import { WithRouter } from "@components/routingWrapper";

class NotificationIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNotification: false,
    };
  }
  render() {
    return (
      <button
        className="icon iconBox"
        onClick={this.props.navigate}
        value="../notification"
      >
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.7913 9.62971C8.17113 6.21122 11.0606 3.625 14.5002 3.625C17.9397 3.625 20.8292 6.21122 21.209 9.62971L21.5133 12.3681C21.5571 12.7627 21.579 12.96 21.6103 13.1539C21.7513 14.0288 22.0366 14.8741 22.4547 15.6555C22.5474 15.8287 22.6495 15.9989 22.8538 16.3394L23.5578 17.5127C24.3635 18.8556 24.7664 19.5271 24.4792 20.0344C24.1919 20.5417 23.4089 20.5417 21.8428 20.5417H7.15754C5.59143 20.5417 4.80837 20.5417 4.52114 20.0344C4.23392 19.5271 4.63679 18.8556 5.44255 17.5127L6.14653 16.3394C6.3508 15.9989 6.45293 15.8287 6.54563 15.6555C6.96369 14.8741 7.24904 14.0288 7.39001 13.1539C7.42127 12.96 7.44319 12.7627 7.48704 12.3681L7.7913 9.62971Z"
            fill="#223F80"
          />
          <path
            d="M10.875 20.5417C10.875 21.0177 10.9688 21.4891 11.1509 21.9289C11.3331 22.3687 11.6001 22.7683 11.9367 23.1049C12.2734 23.4415 12.673 23.7085 13.1128 23.8907C13.5526 24.0729 14.024 24.1667 14.5 24.1667C14.976 24.1667 15.4474 24.0729 15.8872 23.8907C16.327 23.7085 16.7266 23.4415 17.0633 23.1049C17.3999 22.7683 17.6669 22.3687 17.8491 21.9289C18.0312 21.4891 18.125 21.0177 18.125 20.5417L14.5 20.5417H10.875Z"
            fill="#223F80"
          />
        </svg>
        {this.state.newNotification && (
          <svg
            id="notifCircle"
            version="1.1"
            x="0px"
            y="0px"
            width="122.88px"
            height="122.88px"
            viewBox="0 0 122.88 122.88"
            enableBackground="new 0 0 122.88 122.88"
          >
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z"
              />
            </g>
          </svg>
        )}
      </button>
    );
  }
}
NotificationIcon.propTypes = {
  navigate: PropTypes.func.isRequired,
};
export default WithRouter(NotificationIcon);
