import React from "react";
import PropTypes from "prop-types";

import Date_range from "@assets/images/Date_range.svg";
import Time from "@assets/images/Time.svg";
import dateToString from "@utils/dateToString.js";

// import "../styles/home.css"
class SnoozeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTask: { ...this.props.currentTask },
    };
    this.snoozeTask = this.snoozeTask.bind(this);
    this.changeInDate = this.changeInDate.bind(this);
    this.changeInTime = this.changeInTime.bind(this);
  }
  snoozeTask() {
    let container = document.querySelector("#snoozeTaskDiv");
    let date = container.querySelector("#date");
    let time = container.querySelector("#time");
    let obj = this.state.currentTask;
    obj.date = date.value + "T" + time.value + "Z";

    fetch("/snoozeTask", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(this.props.toggleSnoozeTaskMenu);
  }
  changeInDate(e) {
    let value = e.currentTarget.value;
    let date =
      value +
      "T" +
      new Date(this.state.currentTask.date)
        .getHours()
        .toString()
        .padStart(2, "0") +
      ":" +
      new Date(this.state.currentTask.date)
        .getMinutes()
        .toString()
        .padStart(2, "0");
    let currentTask = this.state.currentTask;
    currentTask.date = date;
    this.setState({ currentTask: currentTask });
  }
  changeInTime(e) {
    let value = e.currentTarget.value;
    //console.log(value);
    let date =
      dateToString(new Date(this.state.currentTask.date), 2).replace(
        / /g,
        "-"
      ) +
      "T" +
      value;
    let currentTask = this.state.currentTask;
    currentTask.date = date;
    this.setState({ currentTask: currentTask }, () => {
      //console.log(this.state.currentTask.date);
    });
  }
  componentDidMount() {
    //console.log(this.props.currentTask, this.state);
    //console.log(this.props.currentTask.date);
    //console.log(new Date(this.props.currentTask.date).getHours());
    //console.log("snooze task is mounted");
    this.setState({
      currentTask: this.props.currentTask,
    });
  }
  render() {
    return (
      <div
        id="snoozeTaskScreen"
        style={{
          display: this.props.display,
          zIndex: 2,
          position: "absolute ",
        }}
      >
        <div id="snoozeTaskDiv">
          <div id="portion1">
            <button id="closeIcon" onClick={this.props.toggleSnoozeTaskMenu}>
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
          </div>
          <div id="portion2">
            <input
              id="title"
              type="text"
              placeholder="Add title"
              value={this.state.currentTask.title}
              disabled
            />
            <textarea
              name=""
              id="desc"
              placeholder="Description"
              value={this.state.currentTask.body}
              disabled
            ></textarea>
            <div id="fieldDiv">
              <div className="field">
                <img src={Date_range} alt="date" />
                <input
                  type="date"
                  id="date"
                  value={dateToString(
                    new Date(this.state.currentTask.date),
                    2
                  ).replace(/ /g, "-")}
                  onChange={this.changeInDate}
                />
              </div>
              <div className="field">
                <img src={Time} alt="time" />
                <input
                  type="time"
                  id="time"
                  value={
                    new Date(this.state.currentTask.date)
                      .getHours()
                      .toString()
                      .padStart(2, "0") +
                    ":" +
                    new Date(this.props.currentTask.date)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")
                  }
                  onChange={this.changeInTime}
                />
              </div>
            </div>
          </div>
          <button id="save" onClick={this.snoozeTask}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
SnoozeMenu.propTypes = {
  currentTask: PropTypes.object.isRequired,
  display: PropTypes.string.isRequired,
  toggleSnoozeTaskMenu: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
export default SnoozeMenu;
