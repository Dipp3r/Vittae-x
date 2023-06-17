import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SigninComp from 'pages/sign_in/signin.js';
import SignUpMobComp from 'pages/sign_up/signUpMob.js'
import SignUpOTP from 'pages/sign_up/signUpOTP.js';
import SignupComp from 'pages/sign_up/signup.js';

import ForgotPassword from 'pages/sign_in/forgotPassword.js';
import FirstComp from 'pages/others/first.js';
// import {WithRouter} from 'components/routingWrapper.js';

import NewPasswordComp from 'pages/sign_in/newPassword.js'
import TermsAndConditionsComp from 'pages/others/termsAndConditions.js';

import ForgotOTP from 'pages/sign_in/forgotOTP.js';


import DashboardComp  from 'pages/dashboard/dashboard.js';
import Profile from 'pages/profile/profile.js';
import ProfileInfo from 'pages/profile/profileInfo.js';

import CustomerView from 'pages/dashboard/contacts/customerView.js';
import MonthlyView from 'pages/dashboard/home/monthlyView.js';
import IncentiveComp from 'pages/dashboard/incentive.js';
import RenumerationComp from 'pages/dashboard/renumeration.js';
import Tasks from 'pages/dashboard/home/tasks.js';
import ErrorComp from 'pages/others/error.js';

import * as serviceWorkerRegistration from 'utils/serviceWorkerRegistration.js';
import NotificationComp from 'pages/dashboard/notification.js';

class IndexComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      mobile:'',
      id:undefined,
      contactCompState:{
        current_page:1,
        addClientMenu:'none',
        filterMenu:'none',
        searchValue:'',
        userInfo:{
          name:'',
          mobile:'',
          mail:'',
          designation:'',
        },
        filterProps:{
          status:0,
          sort: 'dateDesc',
          tag:[""]
        },
        customerCompList:[]
      },
      customerList:[],
      homeCompState:{
        lastSelectedDate:null,
        today:new Date()
      }
    }
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
  }
  getItem(key){
    return  this.state[key]
  }
  setItem(obj,callBack){
    this.setState(obj,callBack)
  }
  render(){
    
  return(
    <BrowserRouter history={HashRouter} >
      <Routes history={HashRouter} >
      <Route path ="*" index element={<ErrorComp />}/>
      <Route path ="/" index element={<FirstComp />}/>
        <Route path ="/login" index element={<SigninComp getItem={this.getItem} setItem={this.setItem}  />}/>
        <Route path='/mobileSignUp' element={<SignUpMobComp setItem={this.setItem} />} />
        <Route path='/signUpOTP' element={<SignUpOTP getItem={this.getItem} setItem={this.setItem} />}/>
        <Route path='/register' element = {<SignupComp getItem={this.getItem} setItem={this.setItem} />}/>
        <Route path='/termsAndConditions' element={<TermsAndConditionsComp/>}/>
        
        <Route path='/forgotPassword' element={<ForgotPassword  setItem={this.setItem}  />} />
        <Route path='/forgotOTP' element={<ForgotOTP getItem={this.getItem} setItem={this.setItem} />}/>
        <Route path='/newPass' element={<NewPasswordComp getItem={this.getItem} setItem={this.setItem}  />}/>


        <Route path='/dashboard' element = {<DashboardComp getItem={this.getItem} setItem={this.setItem}/>}/>
        <Route path='/incentive' element = {<IncentiveComp/>}/>
        <Route path='/renumeration' element = {<RenumerationComp />  }/>
        <Route path='/notification' element={<NotificationComp/>}/>

        <Route path='/profile' element={<Profile getItem={this.getItem} setItem={this.setItem}  />}/>
        <Route path='/profileinfo' element={<ProfileInfo getItem={this.getItem} setItem={this.setItem}   />} /> 
        <Route path='/monthlyview' element={<MonthlyView getItem={this.getItem} setItem={this.setItem}/>} />
        <Route path='/tasks' element={<Tasks getItem={this.getItem} setItem={this.setItem} />} />
        

        <Route path='/customerview' element={<CustomerView getItem={this.getItem} setItem={this.setItem}  />} />
      </Routes>


    </BrowserRouter>
  )
  }
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <IndexComp/>
  </div>
);

serviceWorkerRegistration.register();