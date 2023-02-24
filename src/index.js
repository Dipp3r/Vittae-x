import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";

import './index.css'
import './index.css'

import LoginComp from './login.js';
import SignUpMobComp from './signUpMob'
import SignUpOTP from './signUpOTP';
import RegisterComp from './reg.js';

import ForgotPassword from './forgotPassword.js';
import FirstComp from './first.js';
import {WithRouter } from './routingWrapper';

import NewPassComp from './newPass.js'
import TermsAndConditionsComp from './termsAndConditions.js';

import ForgotOTP from './forgotOTP';


import DashboardComp  from './dashboard/dashboard.js';
import Profile from './dashboard/profile.js';
import ProfileInfo from './dashboard/profileInfo';

import CustomerView from './dashboard/customerView';
import MonthlyView from './dashboard/monthlyView';
import IncentiveComp from './dashboard/incentive';
import RenumerationComp from './dashboard/renumeration';
import Tasks from './dashboard/tasks';

class IndexComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {mobile:''}
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
  }
  getItem(key){
   return  this.state[key]
  }
  setItem(key,value){
    let obj = {}
    obj[key] = value
    this.setState(obj)
  }
  render(){
    console.log(this.state);
  return(
    <BrowserRouter history={HashRouter} >
      <Routes history={HashRouter} >
      <Route path ="/" index element={<FirstComp />}/>
        <Route path ="/login" index element={<LoginComp />}/>
        <Route path='/mobileSignUp' element={<SignUpMobComp setItem={this.setItem} />} />
        <Route path='/signUpOTP' element={<SignUpOTP/>}/>
        <Route path='/register' element = {<RegisterComp getItem={this.getItem} />}/>
        <Route path='/termsAndConditions' element={<TermsAndConditionsComp/>}/>
        
        <Route path='/forgotPassword' element={<ForgotPassword  setItem={this.setItem}  />} />
        <Route path='/forgotOTP' element={<ForgotOTP/>}/>
        <Route path='/newPass' element={<NewPassComp/>}/>


        <Route path='/dashboard' element = {<DashboardComp />}/>
        <Route path='/incentive' element = {<IncentiveComp/>}/>
        <Route path='/renumeration' element = {<RenumerationComp />  }/>


        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profileinfo' element={<ProfileInfo/>} /> 

        <Route path='/monthlyview' element={<MonthlyView/>} />
        <Route path='/tasks' element={<Tasks />} />
        

        <Route path='/customerview' element={<CustomerView/>} />
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
