import React from "react";
import PropTypes from "prop-types";
import { WithRouter } from "@components/routingWrapper";
import checkString from "@utils/stringChecker";
import "@assets/styles/login.scss";
import eye from "@assets/images/eye.svg";
import eyeOff from "@assets/images/eye_off.svg";

class SigninComp extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      password: "",
      mobileErr: "",
      passwordErr: "",
      passwordInType: "password",
      rememberMe: false,
    };
    this.submitLink = import.meta.env.VITE_BASE_SERVER_URL + "/broker-login/";
    this.changeInVal = this.changeInVal.bind(this);
    this.submit = this.submit.bind(this);
    this.changePasswordVis = this.changePasswordVis.bind(this);
    this.changeRememberMe = this.changeRememberMe.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }
  changeInVal(e) {
    let obj = {};
    if (e.keyCode === 13) {
      this.submit();
    }
    if (e.currentTarget.name === "mobile") {
      if (/\D/.test(e.currentTarget.value.slice(-1))) {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/, "");
        return;
      }
    }
    obj[e.currentTarget.name] = e.target.value.trim();
    this.setState(obj);
  }
  changePasswordVis(e) {
    if (this.state.passwordInType === "password") {
      this.setState({ passwordInType: "text" });
      e.currentTarget.src = eye;
    } else {
      this.setState({ passwordInType: "password" });
      e.currentTarget.src = eyeOff;
    }
  }
  changeColor(element, color) {
    document.querySelector(element).style.borderColor = color;
  }
  changeRememberMe() {
    let rememberMeBox = document.body.querySelector("#rememberMeBox");
    if (this.state.rememberMe) {
      this.setState({ rememberMe: false });
      rememberMeBox.style.backgroundColor = "#FFFFFF";
      rememberMeBox.style.borderColor = "#b8b8b8";
    } else {
      this.setState({ rememberMe: true });
      rememberMeBox.style.backgroundColor = "#223F80";
      rememberMeBox.style.borderColor = "#223F80";
    }
  }
  async submit() {
    let isErr = false;
    let defaultColor = "#b8b8b8";
    let invalidColor = "#BB2230";
    let checkRes = checkString(this.state.password, 1);
    if (!checkRes.bool) {
      this.setState({ passwordErr: checkRes.msg });
      isErr = true;
      this.changeColor("#passwordBox", invalidColor);
    } else {
      this.setState({ passwordErr: "" });
      this.changeColor("#passwordBox", defaultColor);
    }

    this.changeColor("#numberField", defaultColor);
    checkRes = checkString(this.state.phone, 3);
    if (!checkRes.bool) {
      isErr = true;
      this.changeColor("#numberField", invalidColor);
    }
    this.setState({ mobileErr: checkRes.msg });
    if (isErr) return;
    let obj = {
      phone: this.state.phone,
      password: this.state.password,
    };
    //console.log(obj);
    //sending data to the server
    await fetch(this.submitLink, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: "Passcode 	bcb4d6b0b3492cac6ec2c7638f1f842ed60feae4",
        "Content-type": "application/json; charset=UTF-8",
        Connection: "keep-alive",
      },
    }).then(async (response) => {
      //console.log(response);
      if (response.status == 200) {
        let data = await response.json();
        for (let key in data) {
          localStorage.setItem(key, data[key]);
        }
        this.props.setItem(data, () => {
          this.props.navigate("../dashboard");
        });
      } else if (response.status == 400) {
        let data = await response.json();
        console.log(data.password);
        if (data.password) {
          this.setState({ passwordErr: data.password });
          this.changeColor("#passwordBox", invalidColor);
        }
      }
    });
  }
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return (
      <section id="signInPage">
        <div id="signInFormDiv">
          <div id="signInTextDiv">
            <p id="signInText">SIGN IN</p>
          </div>
          <div id="fieldBox">
            <p id="emailLable" className="inLabel">
              Mobile number
            </p>
            <input
              onChange={this.changeInVal}
              onKeyDown={this.changeInVal}
              onFocus={() => this.changeColor("#numberField", "#223F80")}
              onBlur={() => this.changeColor("#numberField", "#b8b8b8")}
              value={this.state.phone}
              name="phone"
              type="tel"
              placeholder="1234567890"
              id="numberField"
            />
            <p className="invalid">{this.state.mobileErr}</p>
            <div id="passwordDiv">
              <p className="inLabel">Password</p>
              <div id="passwordBox">
                <input
                  onChange={this.changeInVal}
                  onKeyDown={this.changeInVal}
                  onFocus={() => this.changeColor("#passwordBox", "#223F80")}
                  onBlur={() => this.changeColor("#passwordBox", "#b8b8b8")}
                  name="password"
                  type={this.state.passwordInType}
                  placeholder="Example!123"
                  id="passwordField"
                  className="password"
                  value={this.state.password}
                />
                <img src={eyeOff} alt="eye" onClick={this.changePasswordVis} />
              </div>
              <p className="invalid">{this.state.passwordErr}</p>
            </div>

            {/* <div className="tickBox">
        <button value="0" className="tickButton" onClick={this.changeRememberMe} id="rememberMeBox">
          <svg width="12" height="10" viewBox="0 0 15 14" fill="none">
            <path d="M1.5 8L6.5 12.5L13.5 1.5" stroke="white" strokeWidth="3" strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </button>

        <p>Remember me</p>
      </div> */}

            <div id="buttonDiv">
              <button id="Button" onClick={this.submit}>
                SIGN IN
              </button>
            </div>
            <div id="forgotPwd">
              <p onClick={this.props.navigate} value="../forgotPassword">
                Forgot password?
              </p>
            </div>

            <div id="accDiv">
              <hr />
              <div>
                <p id="grayed">
                  Need an account?
                  <i
                    id="link"
                    onClick={this.props.navigate}
                    value="../mobileSignUp"
                  >
                    Signup
                  </i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
SigninComp.propTypes = {
  setItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default WithRouter(SigninComp);
