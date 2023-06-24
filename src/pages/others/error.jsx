import React from "react";
import error from "@assets/images/error.png";
class ErrorComp extends React.Component {
  render() {
    return (
      <section id="error">
        <img src={error} alt="error404" />
      </section>
    );
  }
}

export default ErrorComp;
