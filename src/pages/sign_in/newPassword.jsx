import React from "react";
import PropTypes from "prop-types";
import { WithRouter } from "@components/routingWrapper";
import checkString from "@utils/stringChecker";
import "@assets/styles/newPass.scss";

import eye from "@assets/images/eye.svg";
import eyeOff from "@assets/images/eye_off.svg";

class NewPasswordComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      cPassword: "",
      passType: "password",
      cPassType: "password",
      cPasswordErr: "",
      passwordErr: "",
    };
    this.submitLink =
      import.meta.env.VITE_BASE_SERVER_URL +
      `/reset-password/${this.props.getItem("id")}/`;
    this.changeInVal = this.changeInVal.bind(this);
    this.submit = this.submit.bind(this);
    this.changePasswordVis = this.changePasswordVis.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }
  changePasswordVis(e) {
    let state;
    if (this.state[e.currentTarget.name] === "password") {
      state = "text";
      e.currentTarget.src = eye;
    } else {
      state = "password";
      e.currentTarget.src = eyeOff;
    }
    let obj = {};
    obj[e.currentTarget.name] = state;
    this.setState(obj);
  }
  changeInVal(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
    var obj = {};
    obj[e.currentTarget.name] = e.target.value.trim();
    this.setState(obj);
  }
  changeColor(element, color) {
    document.querySelector(element).style.borderColor = color;
  }
  submit() {
    //console.log("submit clicked");
    let isErr = false;
    let passCheck = checkString(this.state.password, 1);
    let cPassCheck = checkString(this.state.cPassword, 1);
    let defaultColor = "#616161",
      invalidColor = "#BB2230";
    // let passwordErr = '',cPasswordErr = ''

    this.changeColor("#passwordIn", defaultColor);
    this.changeColor("#cPasswordIn", defaultColor);
    if (!cPassCheck.bool) {
      this.changeColor("#passwordIn", invalidColor);
      isErr = true;
    }
    // //console.log('cpass',isErr)
    if (!passCheck.bool) {
      isErr = true;
      this.changeColor("#cPasswordIn", invalidColor);
    }
    // //console.log('pass',isErr)
    this.setState({ passwordErr: passCheck.msg, cPasswordErr: cPassCheck.msg });
    if (this.state.password !== this.state.cPassword) {
      isErr = true;
      this.setState({
        cPassword: "",
        cPasswordErr: "passwords doesn't match conform password again",
      });
      this.changeColor("#cPasswordIn", invalidColor);
    }
    // //console.log(isErr)
    if (isErr) return;
    var obj = { password: this.state.password };
    //sending data to the server
    fetch(this.submitLink, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        //console.log(response.json());
        if (response.status !== 200) return {};
        this.props.navigate("../login");
        response.json();
      })
      .then((response) => {
        if (response.status !== 200) throw new Error("Something went wrong");
        return response.json();
      })
      .then(() => {
        this.props.navigate("../login");
      });
  }
  render() {
    //console.log(this.state);
    return (
      <section id="newPassword">
        <div id="phoneSignUpFormDiv">
          <div id="phoneSignUpTextDiv">
            <p id="phoneSignUpText">CREATE A STRONG PASSWORD</p>
          </div>

          <div id="constraintDiv">
            <p id="title">Password must contain at least</p>
            <div id="constraints">
              <al id="constraintText">
                <li>8 characters</li>
                <li>uppercase and lowercase</li>
              </al>
            </div>
          </div>

          <div className="passwordDiv">
            <p className="inLabel">New password</p>
            <div className="passwordBox" id="passwordIn">
              <input
                type={this.state.passType}
                onKeyDown={this.changeInVal}
                onChange={this.changeInVal}
                onFocus={() => this.changeColor("#passwordIn", "#223F80")}
                onBlur={() => this.changeColor("#passwordIn", "#b8b8b8")}
                name="password"
                placeholder="Example!123"
                className="passwordField password"
                value={this.state.password}
              />
              <img
                src={eyeOff}
                onClick={this.changePasswordVis}
                name="passType"
                alt="eye icon"
              />
            </div>
          </div>

          <p className="invalid">{this.state.passwordErr}</p>
          <div className="passwordDiv">
            <p className="inLabel">Confirm password</p>
            <div className="passwordBox" id="cPasswordIn">
              <input
                type={this.state.cPassType}
                onChange={this.changeInVal}
                onKeyDown={this.changeInVal}
                onFocus={() => this.changeColor("#cPasswordIn", "#223F80")}
                onBlur={() => this.changeColor("#cPasswordIn", "#b8b8b8")}
                placeholder="Example!123"
                className="passwordField password"
                name="cPassword"
                value={this.state.cPassword}
              />
              <img
                src={eyeOff}
                onClick={this.changePasswordVis}
                name="cPassType"
                alt="eye icon"
              />
            </div>
          </div>
          <p className="invalid">{this.state.cPasswordErr}</p>

          <div id="buttonDiv">
            <button id="Button" onClick={this.submit}>
              SIGN IN
            </button>
          </div>
        </div>
      </section>
    );
  }
}
NewPasswordComp.propTypes = {
  getItem: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
export default WithRouter(NewPasswordComp);
