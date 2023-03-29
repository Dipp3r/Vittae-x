import React, { createElement } from 'react';
import ReactDOM from 'react-dom/client';
import { WithRouter } from '../routingWrapper';
import ContactsComp from './contact';
import HomeComp from './home';
import profile from "../images/profile.png"
import "../styles/home.css"
import "../styles/contact.css"

class DashboardComp extends React.Component{
    constructor(){
        super()
        this.state = {
          isHome:true
        }
        this.getListOFCustomers = this.getListOFCustomers.bind(this);
        this.changeInVal = this.changeInVal.bind(this)
        this.toggleHomeContacts = this.toggleHomeContacts.bind(this)
        this.dataUrl = ``
    }
    getListOFCustomers(){
        var CustomerList = []
        var URL = ''
        var listInHTML = ''
        fetch(URL,{
            method:'GET'
        })
        .then(response => response.json())
        .then(raw_data=>{
            
            var data = raw_data.data
            for(var i = 0;i<data.length;i++){
                var node = document.createElement('div')
                node.innerHTML = `<div>
                    <p>${data[i].name}</p>
                    <p>${data[i].dataOfReg}</p>
                    <p>${data[i].stage}</p>
                </div>`
                document.body.querySelector('#listContainer').appendchild(node)
            }
        })
    }

    changeInVal(e){
        let obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    }
    toggleHomeContacts(e){
      this.setState({isHome:!this.state.isHome},()=>{
        this.props.setItem({dashboard:this.state})
      })
    }
    componentDidMount(){
      this.setState(this.props.getItem("dashboard"))
      // console.log()
      this.dataUrl = `http://dev.api.vittae.money/broker/customer-list/?page=1&page_size=10&search=my`
      console.log(this.props.getItem("Authorization"))
      fetch(this.dataUrl,{
        method:'GET',
        headers: {
          "Authorization":"Passcode bcb4d6b0b3492cac6ec2c7638f1f842ed60feae4",
        "Content-type": "application/json; charset=UTF-8",
        'Connection':"keep-alive"}
      })
      .then((response)=>{
        console.log(response)
        return response.json()})
      .then((data)=>{
        console.log(data)
        this.props.setItem({customerList:data.data})
      })
    }
    render(){
        
        return(
        <section id="dashboard">
            <nav className="navbar" >
              <button className="profile" onClick={this.props.navigate} value="../profile">
                <img id="profileImg" src= {profile} alt="" />
              </button>
          
              <div className="icons">
                <button className="icon">
                  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="19.3335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80"
                      strokeWidth="2" strokeLinejoin="round" />
                    <rect x="4.8335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80"
                      strokeWidth="2" strokeLinejoin="round" />
                    <path d="M4.8335 15.7083V19.3333" stroke="#223F80" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" />
                    <path d="M24.1665 15.7083V19.3333" stroke="#223F80" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" />
                    <path
                      d="M24.1668 15.7083C24.1668 12.8241 23.1484 10.058 21.3355 8.01856C19.5227 5.9791 17.0639 4.83334 14.5002 4.83334C11.9364 4.83334 9.47765 5.9791 7.6648 8.01856C5.85195 10.058 4.8335 12.8241 4.8335 15.7083"
                      stroke="#223F80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
          
                <button className="icon iconBox">
                  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.7913 9.62971C8.17113 6.21122 11.0606 3.625 14.5002 3.625C17.9397 3.625 20.8292 6.21122 21.209 9.62971L21.5133 12.3681C21.5571 12.7627 21.579 12.96 21.6103 13.1539C21.7513 14.0288 22.0366 14.8741 22.4547 15.6555C22.5474 15.8287 22.6495 15.9989 22.8538 16.3394L23.5578 17.5127C24.3635 18.8556 24.7664 19.5271 24.4792 20.0344C24.1919 20.5417 23.4089 20.5417 21.8428 20.5417H7.15754C5.59143 20.5417 4.80837 20.5417 4.52114 20.0344C4.23392 19.5271 4.63679 18.8556 5.44255 17.5127L6.14653 16.3394C6.3508 15.9989 6.45293 15.8287 6.54563 15.6555C6.96369 14.8741 7.24904 14.0288 7.39001 13.1539C7.42127 12.96 7.44319 12.7627 7.48704 12.3681L7.7913 9.62971Z"
                      fill="#223F80" />
                    <path
                      d="M10.875 20.5417C10.875 21.0177 10.9688 21.4891 11.1509 21.9289C11.3331 22.3687 11.6001 22.7683 11.9367 23.1049C12.2734 23.4415 12.673 23.7085 13.1128 23.8907C13.5526 24.0729 14.024 24.1667 14.5 24.1667C14.976 24.1667 15.4474 24.0729 15.8872 23.8907C16.327 23.7085 16.7266 23.4415 17.0633 23.1049C17.3999 22.7683 17.6669 22.3687 17.8491 21.9289C18.0312 21.4891 18.125 21.0177 18.125 20.5417L14.5 20.5417H10.875Z"
                      fill="#223F80" />
                  </svg>
                  <svg id="notifCircle" version="1.1" x="0px" y="0px" width="122.88px" height="122.88px"
                    viewBox="0 0 122.88 122.88" enableBackground="new 0 0 122.88 122.88">
                    <g>
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z" />
                    </g>
                  </svg>
                </button>
              </div>
            </nav>
          
            <div id="main">
             {(this.state.isHome)?< HomeComp getItem={this.props.getItem} setItem={this.props.setItem} />:<ContactsComp getItem={this.props.getItem} setItem={this.props.setItem}  />}   
              <div className="fixed" onClick={this.toggleHomeContacts}>
                <div className={this.state.isHome?"downIconDivClick":"downIconDiv"}>

                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.6665 17.0128C6.6665 15.2025 6.6665 14.2973 7.03245 13.5017C7.3984 12.706 8.08566 12.1169 9.46017 10.9388L10.7935 9.79591C13.2779 7.66641 14.5201 6.60165 15.9998 6.60165C17.4795 6.60165 18.7217 7.66641 21.2062 9.79591L22.5395 10.9388C23.914 12.1169 24.6013 12.706 24.9672 13.5017C25.3332 14.2973 25.3332 15.2025 25.3332 17.0128V22.6667C25.3332 25.1808 25.3332 26.4379 24.5521 27.219C23.7711 28 22.514 28 19.9998 28H11.9998C9.48568 28 8.2286 28 7.44755 27.219C6.6665 26.4379 6.6665 25.1808 6.6665 22.6667V17.0128Z"
                      stroke="#223F80" strokeWidth="2" />
                    <path
                      d="M19.3332 28V21C19.3332 20.4477 18.8855 20 18.3332 20H13.6665C13.1142 20 12.6665 20.4477 12.6665 21V28"
                      stroke="#223F80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Home</p>
                </div>
          
                <div className={!this.state.isHome?"downIconDivClick":"downIconDiv"} onClick={this.toggleHomeContacts}>
                  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14.5" cy="12.0833" r="3.625" stroke="#223F80" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="14.5" cy="14.5" r="10.875" stroke="#223F80" strokeWidth="2" />
                    <path
                      d="M21.75 22.603C21.3224 21.3183 20.3801 20.1831 19.0692 19.3735C17.7584 18.5639 16.1523 18.125 14.5 18.125C12.8477 18.125 11.2416 18.5639 9.93079 19.3735C8.61995 20.1831 7.67764 21.3183 7.25 22.603"
                      stroke="#223F80" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p>
                    Contacts
                  </p>
                </div>
              </div>
            </div>
          
            
          
        
        </section>
        )
    }
}

export default WithRouter(DashboardComp)