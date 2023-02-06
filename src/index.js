import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginComp from './login.js';
import RegisterComp from './reg.js';
import MainComp  from './main.js';

import './index.css'
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
        <Route path ="/login" index element={<LoginComp />}/>
        <Route path='/'index element = {<RegisterComp />}/>
        <Route path='/main' element = {<MainComp />}/>
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

