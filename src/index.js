import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";

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
    this.state = {
      mobile:'',
      contactCompState:{
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
        }
      },
      customerList:[
          {id:1,name:'aaa sfkeeb jksefkj nsejkfnjk snefjk ',mobile:'1234567123',status:4,date:'02/01/2002',tag:['tag1','tag2']},
          {id:3,name:'ccc',mobile:'1234567820',status:1,date:'02/03/2002',tag:['tag1','tag2']},
          {id:2,name:'bbb',mobile:'1234567812',status:1,date:'02/02/2002',tag:['tag1','tag2']},
          {id:4,name:'ddd',mobile:'1234547890',status:2,date:'02/21/2002',tag:['tag1','tag2']},
          {id:5,name:'eee',mobile:'1234347890',status:3,date:'02/19/2002',tag:['tag1','tag2']},
          {id:6,name:'eee',mobile:'1234347890',status:3,date:'02/17/2002',tag:[]},
          {id:7,name:'eee',mobile:'1234347890',status:2,date:'02/15/2002',tag:['tag3','tag4']},
          {id:8,name:'eee',mobile:'1234347890',status:2,date:'02/12/2002',tag:['tag2']},
          {id:9,name:'eee',mobile:'1234347890',status:2,date:'02/09/2002',tag:['tag1','tag2']},
          {id:10,name:'eee',mobile:'1234347890',status:2,date:'02/08/2002',tag:['tag1','tag2']},
          {id:11,name:'eee',mobile:'1234347890',status:2,date:'02/01/2002',tag:['tag1','tag2']},
          {id:12,name:'eee',mobile:'1234347890',status:2,date:'02/07/2002',tag:['tag2']},
          {id:13,name:'eee',mobile:'1234347890',status:2,date:'02/04/2002',tag:['tag3']},
          {id:14,name:'eee',mobile:'1234347890',status:2,date:'02/06/2002',tag:['tag4']}
      ]
    }
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
  }
  getItem(key){
    console.log(this.state,key)
    return  this.state[key]
  }
  setItem(obj,callBack){
    this.setState(obj,callBack)
  }
  render(){
    
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