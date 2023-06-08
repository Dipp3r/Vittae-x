import React from 'react';
// import './App.css';
import {CheckCircleOutlined} from '@ant-design/icons';
import { Steps } from 'antd';
// const description = 'This is a description.';
class KYCsteps extends React.Component{
  
  render(){
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
              items={this.props.items.map((element)=>{
                return {title:element.name,description:element.description,icon:<CheckCircleOutlined />}
              })}
          />
      </div>
    );
  }
}

export default KYCsteps;
