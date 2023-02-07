import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";


import LoginComp from './login.js';
import RegisterComp from './reg.js';
import HomeComp  from './home.js';


import './index.css'
import MobileComp from './mobile.js';
import EmailOTP from './email.js';

import FirstComp from './first.js';

class IndexComp extends React.Component{
  constructor(){
    super()
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
        <Route path='/mobileOTP' element={<MobileComp/>} />
        <Route path='/emailOTP' element={EmailOTP}/>
      </Routes>
    
    </BrowserRouter>
  )
  }
}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <IndexComp />
  </div>
);
