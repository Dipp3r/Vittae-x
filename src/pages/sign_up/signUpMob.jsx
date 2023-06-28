// import React from "react"
import MobComp from "@components/mobComp";
import { WithRouter } from "@components/routingWrapper";
import "@assets/styles/mobComp.scss";

class SignUpMobComp extends MobComp {
  constructor(props) {
    super(props);
    this.loc = "../signUpOTP";
    // this.submitLink = ''
    this.title = "Sign up";
    this.setItem = this.props.setItem;
    this.errorText = "";
  }
  process(data) {
    if (data.old_user) {
      //registered user
      this.errorText = "mobile number is already resigtered";
    } else {
      //unregistered user
      this.props.navigate(this.loc);
    }
  }
}

export default WithRouter(SignUpMobComp);
