import React from "react";
import PropTypes from "prop-types";

import { CheckCircleOutlined } from "@ant-design/icons";
import { Steps } from "antd";

class KYCsteps extends React.Component {
  render() {
    return (
      <div className="App">
        <Steps
          className="custome-step"
          id="check"
          direction="vertical"
          size="small"
          current={1}
          // icon: <CheckCircleOutlined />,
          // items={[
          //   {
          //     title: 'Signed into Vittae app',
          //     description,
          //   },
          //   {
          //     title: 'Started KYC',
          //     description,
          //     icon: <CheckCircleOutlined />
          //   },
          //   {
          //     title: 'Plan upload',
          //     description,
          //     icon: <CheckCircleOutlined />
          //   },
          // ]}
          items={this.props.items.map((element) => {
            return {
              title: element.name,
              description: element.description,
              icon: <CheckCircleOutlined />,
            };
          })}
        />
      </div>
    );
  }
}

KYCsteps.propTypes = {
  items: PropTypes.array.isRequired,
};
export default KYCsteps;
