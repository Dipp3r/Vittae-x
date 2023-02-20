import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";

import './index.css'
import './index.css'

import LoginComp from './login.js';
import SignUpMobComp from './signUpMob'
import SignUpOTP from './signUpOTP';
import RegisterComp from './reg.js';
import HomeComp  from './home.js';

import ForgotPassword from './forgotPassword.js';
import FirstComp from './first.js';
import {WithRouter } from './routingWrapper';

import NewPassComp from './newPass.js'
import TermsAndConditionsComp from './termsAndConditions.js';
import Profile from './profile.js';

import ForgotOTP from './forgotOTP';


class IndexComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  render(){
    
  return(
    <BrowserRouter>
      <Routes>
      <Route path ="/" index element={<FirstComp />}/>
        <Route path ="/login" index element={<LoginComp />}/>
        <Route path='/mobileSignUp' element={<SignUpMobComp />} />
        <Route path='/signUpOTP' element={<SignUpOTP/>}/>
        <Route path='/register' element = {<RegisterComp />}/>
        <Route path='/termsAndConditions' element={<TermsAndConditionsComp/>}/>
        
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/forgotOTP' element={<ForgotOTP/>}/>
        <Route path='/newPass' element={<NewPassComp/>}/>


        <Route path='/home' element = {<HomeComp />}/>
        <Route path='/profile' element={<Profile/>}/>
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
