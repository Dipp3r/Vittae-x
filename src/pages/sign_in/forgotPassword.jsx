// import React from "react";
import MobComp from "@components/mobComp";
import { WithRouter } from "@components/routingWrapper";
// import checkString from "./stringChecker";

class ForgotPassword extends MobComp {
  constructor(props) {
    super(props);
    this.state = {};
    this.loc = "../forgotOTP";
    this.title = "Find Your Profile";
    this.errorText = "";
  }
  process(data) {
    if (data.old_user) {
      //registered user
      this.props.navigate(this.loc);
    } else {
      //unregistered user
      this.errorText = "unregistered mobile number";
    }
  }
}

export default WithRouter(ForgotPassword);
