import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SigninComp from '@pages/sign_in/signin';
import SignUpMobComp from '@pages/sign_up/signUpMob'
import SignUpOTP from '@pages/sign_up/signUpOTP';
import SignupComp from '@pages/sign_up/signup';

import ForgotPassword from '@pages/sign_in/forgotPassword';
import FirstComp from '@pages/others/first';
// import {WithRouter} from 'components/routingWrapper';

import NewPasswordComp from '@pages/sign_in/newPassword'
import TermsAndConditionsComp from '@pages/others/termsAndConditions';

import ForgotOTP from '@pages/sign_in/forgotOTP';


import DashboardComp  from '@pages/dashboard/dashboard';
import Profile from '@pages/profile/profile';
import ProfileInfo from '@pages/profile/profileInfo';

import CustomerView from '@pages/dashboard/contacts/customerView';
import MonthlyView from '@pages/dashboard/home/monthlyView';
import IncentiveComp from '@pages/dashboard/incentive';
import RenumerationComp from '@pages/dashboard/renumeration';
import Tasks from '@pages/dashboard/home/tasks';
import ErrorComp from '@pages/others/error';

import * as serviceWorkerRegistration from '@utils/serviceWorkerRegistration';
import NotificationComp from '@pages/dashboard/notification';

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