import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";

import './index.css'

import LoginComp from './login.js';
import RegisterComp from './reg.js';
import HomeComp  from './home.js';
import MobileComp from './mobile.js';
import EmailOTP from './email.js';
import ForgotPassword from './forgotPassword.js';
import FirstComp from './first.js';
import {WithRouter } from './routingWrapper';

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
        <Route path='/register' element = {<RegisterComp />}/>
        <Route path='/home' element = {<HomeComp />}/>
        <Route path='/mobileOTP' element={<MobileComp text={"mobile:+91 9123456780"} anchorTags={<a className="text-Text_blue underline" onClick={this.props.navigate} to="../mailOTP"> Try using Email </a>}/>} />
        <Route path='/emailOTP' element={<EmailOTP text={'mail:example@mail.com'} anchorTags={<a className="text-Text_blue underline" onClick={this.props.navigate} to="../mobileOTP" > Try using mobile </a>} />}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
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
