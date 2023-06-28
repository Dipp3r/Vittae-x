import React from "react";
import PropTypes from "prop-types";
import "@assets/styles/OTP.scss";

class OTPComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OTP: ["", "", "", ""],
      min: "01",
      sec: "00",
      intervalId: 0,
      isTimeOut: false,
    };
    this.submitLink = import.meta.env.VITE_BASE_SERVER_URL + "/check-otp/";
    this.loc = "../";
    this.changeInVal = this.changeInVal.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.setTime = this.setTime.bind(this);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }
  changeInVal(e) {
    // console.log(Number.parseInt(e.target.getAttribute("name")), e.target.value);
    if (e.keyCode === 13) {
      return this.submit();
    }
    var text = this.state.OTP;
    var num = Number.parseInt(e.currentTarget.getAttribute("name"));
    var value = e.key;
    var inputclass = document.body.querySelector("#otpBox").children;
    //movement
    if (value == "") {
      if (num != 0) inputclass[num - 1].focus();
    } else if (value == "Backspace") {
      if (inputclass[num].value == "" && num != 0) {
        inputclass[num - 1].focus();
        text[num - 1] = "";
        inputclass[num - 1].value = "";
      } else {
        if (num != 0) inputclass[num - 1].focus();
        text[num] = "";
        inputclass[num].value = "";
      }
    } else {
      for (let i = 0; i < num; i++) {
        if (inputclass[i].value == "") {
          num = i;
          inputclass[num].focus();
          break;
        }
      }
      if (num != inputclass.length - 1) inputclass[num + 1].focus();
    }
    text[num] = value;
    inputclass[num].value = value;
    this.setState({ OTP: text });
  }
  reset() {
    var obj = { phone: localStorage.getItem("phone") };
    fetch(import.meta.env.VITE_BASE_SERVER_URL + "/send-otp/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status == 201) return response.json();
        throw new Error("didn't reset");
      })
      .then(() => {
        this.setTime(5, 0);
        [...document.body.querySelector("#otpBox").children].forEach(
          (element) => {
            element.value = "";
          }
        );
      });
  }
  changeTimer() {
    var min = Number.parseInt(this.state.min);
    var sec = Number.parseInt(this.state.sec);
    if (min === 0 && sec === 0) {
      return;
    } else {
      if (sec <= 0) {
        sec = 59;
        min -= 1;
      } else {
        sec -= 1;
      }
      if (min < 10) {
        min = `0${min}`;
      } else {
        min = `${min}`;
      }
      if (sec < 10) {
        sec = `0${sec}`;
      } else {
        sec = `${sec}`;
      }
    }
    // //console.log(this.state)
    this.setState({ min: min, sec: sec });
  }
  setTime(min, sec) {
    var isTimeOut = false;
    if (min < 10) {
      min = `0${min}`;
    } else {
      min = `${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    } else {
      sec = `${sec}`;
    }
    if (min === 0 && sec === 0) {
      this.setState({ isTimeOut: true });
    }
    clearInterval(this.state.intervalId);
    var intervalId = setInterval(this.changeTimer, 1000);
    this.setState({
      min: min,
      sec: sec,
      intervalId: intervalId,
      isTimeOut: isTimeOut,
    });
  }
  changeColor(element, color) {
    document.querySelector(element).style.borderColor = color;
  }
  async submit() {
    // return this.props.navigate(this.loc);
    if (this.state.isTimeOut) return;
    var obj = {
      otp: this.state.OTP.join(""),
      phone: this.props.getItem("phone"),
    };
    if (obj.otp === "") return;
    //console.log(obj);
    let data = await fetch(this.submitLink, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      //console.log(response);
      if (response.status === 201 || response.status === 200) {
        return response.json();
      }
      return undefined;
    });
    // //console.log(data)
    if (data !== undefined) {
      //console.log(data);
      this.props.setItem(data, this.props.navigate(this.loc));
    }
  }
  componentDidMount() {
    //exmaple
    // this.reset()
    this.setTime(1, 6);
  }
  render() {
    return (
      <section id="otpPage">
        <div id="otpDiv">
          <div id="otpTextDiv">
            <p id="otpText">ENTER OTP</p>
            <p id="mobileText">An OTP is sent to your mobile</p>
            <p id="samplephone">{localStorage.getItem("phone")}</p>
          </div>
          <div id="otpBoxDiv">
            <div id="otpBox">
              <input
                id="box0"
                type="number"
                value={this.state.OTP[0]}
                name="0"
                onKeyDown={this.changeInVal}
                onFocus={() => this.changeColor("#box0", "#223F80")}
                onBlur={() => this.changeColor("#box0", "#b8b8b8")}
              />
              <input
                id="box1"
                type="number"
                value={this.state.OTP[1]}
                name="1"
                onKeyDown={this.changeInVal}
                onFocus={() => this.changeColor("#box1", "#223F80")}
                onBlur={() => this.changeColor("#box1", "#b8b8b8")}
              />
              <input
                id="box3"
                type="number"
                value={this.state.OTP[2]}
                name="2"
                onKeyDown={this.changeInVal}
                onFocus={() => this.changeColor("#box3", "#223F80")}
                onBlur={() => this.changeColor("#box3", "#b8b8b8")}
              />
              <input
                id="box4"
                type="number"
                value={this.state.OTP[3]}
                name="3"
                onKeyDown={this.changeInVal}
                onFocus={() => this.changeColor("#box4", "#223F80")}
                onBlur={() => this.changeColor("#box4", "#b8b8b8")}
              />
            </div>
            <p id="otpTime">
              {this.state.min}:{this.state.sec}{" "}
              <p onClick={this.reset}>Resend</p>
            </p>

            <div id="submit">
              <button
                id="Button"
                type="submit"
                value={this.loc}
                onClick={this.submit}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
OTPComp.propTypes = {
  txt: PropTypes.string.isRequired,
  setItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
export default OTPComp;
