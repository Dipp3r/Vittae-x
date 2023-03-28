import React from 'react';
// import './App.css';
import {CheckCircleOutlined} from '@ant-design/icons';
import { Steps } from 'antd';
const description = 'This is a description.';
function KYCsteps() {
  return (
    <div className="App">
        <Steps
          className="custome-step"
          id="check"
          direction="vertical"
            size="small"
            current={1}
            items={[
              {
                title: 'Signed into Vittae app',
                description,
                icon: <CheckCircleOutlined />,
                
              },
              {
                title: 'Started KYC',
                description,
                icon: <CheckCircleOutlined />
              },
              {
                title: 'Plan upload',
                description,
                icon: <CheckCircleOutlined />
              },
            ]}
        />
    </div>
  );
}

export default KYCsteps;
