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
      currentStage:1
    }
    this.changeStage = this.changeStage.bind(this);
  }
  changeStage(e){
    // console.log(typeof(e))
    var stage = 1
    if (Number.isInteger(e)){
      stage = e
    }else{
      stage = e.target.value
    }
    this.setState({currentStage:stage})
  }
  render(){
    
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginComp />}/>
        <Route path='/register' element = {<RegisterComp />}/>
        <Route path='/home' element = {<MainComp />}/>
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

