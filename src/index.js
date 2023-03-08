import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";

// import './index.css';

import LoginComp from './login.js';
import SignUpMobComp from './signUpMob'
import SignUpOTP from './signUpOTP';
import RegisterComp from './reg.js';

import ForgotPassword from './forgotPassword.js';
import FirstComp from './first.js';
import {WithRouter} from './routingWrapper';

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
    console.log(this.state[key])
    return  this.state[key]
  }
  setItem(obj){
    console.log(obj)
    this.setState(obj)
  }
  render(){
    console.log(this.state);
  return(
    <BrowserRouter history={HashRouter} >
      <Routes history={HashRouter} >
      <Route path ="/" index element={<FirstComp />}/>
        <Route path ="/login" index element={<LoginComp getItem={this.getItem} setItem={this.setItem}  />}/>
        <Route path='/mobileSignUp' element={<SignUpMobComp setItem={this.setItem} />} />
        <Route path='/signUpOTP' element={<SignUpOTP getItem={this.getItem} setItem={this.setItem} />}/>
        <Route path='/register' element = {<RegisterComp getItem={this.getItem} setItem={this.setItem} />}/>
        <Route path='/termsAndConditions' element={<TermsAndConditionsComp/>}/>
        
        <Route path='/forgotPassword' element={<ForgotPassword  setItem={this.setItem}  />} />
        <Route path='/forgotOTP' element={<ForgotOTP getItem={this.getItem} setItem={this.setItem} />}/>
        <Route path='/newPass' element={<NewPassComp getItem={this.getItem} setItem={this.setItem}  />}/>


        <Route path='/dashboard' element = {<DashboardComp getItem={this.getItem} setItem={this.setItem}/>}/>
        <Route path='/incentive' element = {<IncentiveComp/>}/>
        <Route path='/renumeration' element = {<RenumerationComp />  }/>


        <Route path='/profile' element={<Profile getItem={this.getItem} setItem={this.setItem}  />}/>
        <Route path='/profileinfo' element={<ProfileInfo getItem={this.getItem} setItem={this.setItem}   />} /> 
        <Route path='/monthlyview' element={<MonthlyView/>} />
        <Route path='/tasks' element={<Tasks />} />
        

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
