import React, { createElement } from 'react';
import ReactDOM from 'react-dom/client';
import { WithRouter } from '../routingWrapper';

class HomeComp extends React.Component{
    constructor(){
        super()
        this.state = {
            totalCusStatus:'ALL',
        }
        this.getListOFCustomers = this.getListOFCustomers.bind(this);
        this.changeInVal = this.changeInVal.bind(this)
        this.filterCustomers = this.filterCustomers.bind(this)
        this.sortCustomers = this.sortCustomers.bind(this)
        this.customerList = [{name:'aaa sfkeeb jksefkj nsejkfnjk snefjk ',mobile:'1234567123',status:'active',date:'01/02/2002'},
        {name:'bbb',mobile:'1234567812',status:'active',date:'01/02/2002'},
        {name:'ccc',mobile:'1234567820',status:'active',date:'01/02/2002'},
        {name:'ddd',mobile:'1234547890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'}];
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
            console.log(raw_data)
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
    filterCustomers(e){
        console.log(e.target.innerText)
        this.setState({totalCusStatus:e.target.innerText})
    }
    sortCustomers(e){
        console.log(e.target.name)
    }
    displayCustomer(){
        let container = document.body.querySelector('#cardsList')
        container.innerHTML = ''

        for(let i of this.customerList){

            let cards = document.createElement('div')
            cards.className = 'cards'

            let name = document.createElement('p')
            name.className = 'name'
            let mobile = document.createElement('p')
            mobile.className = 'mobile'
            let date = document.createElement('p')
            date.className = 'date'
            let status = document.createElement('p')
            status.className = 'status'
            let info = document.createElement('div')
            info.className = 'info'
            let statusBox = document.createElement('div')
            let iTag = document.createElement('i')
            iTag.className = 'down'


            statusBox.appendChild(iTag)
            statusBox.appendChild(status)
            if (i.name.length > 10){
                name.innerText = i.name.slice(0,10)+"..."
            }else{
                name.innerText = i.name
            }
            mobile.innerText = i.mobile
            date.innerText = i.date
            status.innerText = i.status
            
            info.appendChild(name)
            info.appendChild(mobile)
            info.appendChild(statusBox)
            info.appendChild(date)


            cards.appendChild(info)
            container.appendChild(cards);
            console.log(cards)
        }

    } 
    componentDidMount(){
        this.displayCustomer()
    }
    render(){
        console.log(this.state)
        return(
    <section id="dashboard">
        <nav className="navbar">
            <div className="profile" onClick={this.props.navigate} value='../profile'>
                <img id="profileImg" src={require("./images/profile.png")} value='../profile' alt=""/>
            </div>

            <div className="icons">
                <div className="icon">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" >
                        <path d="M2.4165 10.0417C2.4165 8.15604 2.4165 7.21323 3.00229 6.62744C3.58808 6.04166 4.53089 6.04166 6.4165 6.04166H22.5832C24.4688 6.04166 25.4116 6.04166 25.9974 6.62744C26.5832 7.21323 26.5832 8.15604 26.5832 10.0417V11.0833C26.5832 11.5547 26.5832 11.7904 26.4367 11.9369C26.2903 12.0833 26.0546 12.0833 25.5832 12.0833H3.4165C2.9451 12.0833 2.7094 12.0833 2.56295 11.9369C2.4165 11.7904 2.4165 11.5547 2.4165 11.0833V10.0417Z" fill="#223F80"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.4165 22.5833C2.4165 24.469 2.4165 25.4118 3.00229 25.9975C3.58808 26.5833 4.53089 26.5833 6.4165 26.5833H22.5832C24.4688 26.5833 25.4116 26.5833 25.9974 25.9975C26.5832 25.4118 26.5832 24.469 26.5832 22.5833V22.5833V15.5V15.5C26.5832 15.0286 26.5832 14.7929 26.4367 14.6464C26.2903 14.5 26.0546 14.5 25.5832 14.5H3.4165C2.9451 14.5 2.7094 14.5 2.56295 14.6464C2.4165 14.7929 2.4165 15.0286 2.4165 15.5V22.5833ZM8.45817 17.9167C8.45817 17.4453 8.45817 17.2096 8.60462 17.0631C8.75106 16.9167 8.98677 16.9167 9.45817 16.9167H12.2915C12.7629 16.9167 12.9986 16.9167 13.1451 17.0631C13.2915 17.2096 13.2915 17.4453 13.2915 17.9167V18.3333C13.2915 18.8047 13.2915 19.0404 13.1451 19.1869C12.9986 19.3333 12.7629 19.3333 12.2915 19.3333H9.45817C8.98677 19.3333 8.75106 19.3333 8.60462 19.1869C8.45817 19.0404 8.45817 18.8047 8.45817 18.3333V17.9167ZM8.60462 21.8964C8.45817 22.0429 8.45817 22.2786 8.45817 22.75V23.1667C8.45817 23.6381 8.45817 23.8738 8.60462 24.0202C8.75106 24.1667 8.98677 24.1667 9.45817 24.1667H12.2915C12.7629 24.1667 12.9986 24.1667 13.1451 24.0202C13.2915 23.8738 13.2915 23.6381 13.2915 23.1667V22.75C13.2915 22.2786 13.2915 22.0429 13.1451 21.8964C12.9986 21.75 12.7629 21.75 12.2915 21.75H9.45817C8.98677 21.75 8.75106 21.75 8.60462 21.8964ZM15.7082 17.9167C15.7082 17.4453 15.7082 17.2096 15.8546 17.0631C16.0011 16.9167 16.2368 16.9167 16.7082 16.9167H19.5415C20.0129 16.9167 20.2486 16.9167 20.3951 17.0631C20.5415 17.2096 20.5415 17.4453 20.5415 17.9167V18.3333C20.5415 18.8047 20.5415 19.0404 20.3951 19.1869C20.2486 19.3333 20.0129 19.3333 19.5415 19.3333H16.7082C16.2368 19.3333 16.0011 19.3333 15.8546 19.1869C15.7082 19.0404 15.7082 18.8047 15.7082 18.3333V17.9167ZM15.8546 21.8964C15.7082 22.0429 15.7082 22.2786 15.7082 22.75V23.1667C15.7082 23.6381 15.7082 23.8738 15.8546 24.0202C16.0011 24.1667 16.2368 24.1667 16.7082 24.1667H19.5415C20.0129 24.1667 20.2486 24.1667 20.3951 24.0202C20.5415 23.8738 20.5415 23.6381 20.5415 23.1667V22.75C20.5415 22.2786 20.5415 22.0429 20.3951 21.8964C20.2486 21.75 20.0129 21.75 19.5415 21.75H16.7082C16.2368 21.75 16.0011 21.75 15.8546 21.8964Z" fill="#223F80"/>
                        <path d="M8.4585 3.625L8.4585 7.25" stroke="#223F80" stroke-width="2" stroke-linecap="round"/>
                        <path d="M20.5415 3.625L20.5415 7.25" stroke="#223F80" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div className="icon iconBox">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" >
                        <path d="M7.7913 9.62971C8.17113 6.21122 11.0606 3.625 14.5002 3.625C17.9397 3.625 20.8292 6.21122 21.209 9.62971L21.5133 12.3681C21.5571 12.7627 21.579 12.96 21.6103 13.1539C21.7513 14.0288 22.0366 14.8741 22.4547 15.6555C22.5474 15.8287 22.6495 15.9989 22.8538 16.3394L23.5578 17.5127C24.3635 18.8556 24.7664 19.5271 24.4792 20.0344C24.1919 20.5417 23.4089 20.5417 21.8428 20.5417H7.15754C5.59143 20.5417 4.80837 20.5417 4.52114 20.0344C4.23392 19.5271 4.63679 18.8556 5.44255 17.5127L6.14653 16.3394C6.3508 15.9989 6.45293 15.8287 6.54563 15.6555C6.96369 14.8741 7.24904 14.0288 7.39001 13.1539C7.42127 12.96 7.44319 12.7627 7.48704 12.3681L7.7913 9.62971Z" fill="#223F80"/>
                        <path d="M10.875 20.5417C10.875 21.0177 10.9688 21.4891 11.1509 21.9289C11.3331 22.3687 11.6001 22.7683 11.9367 23.1049C12.2734 23.4415 12.673 23.7085 13.1128 23.8907C13.5526 24.0729 14.024 24.1667 14.5 24.1667C14.976 24.1667 15.4474 24.0729 15.8872 23.8907C16.327 23.7085 16.7266 23.4415 17.0633 23.1049C17.3999 22.7683 17.6669 22.3687 17.8491 21.9289C18.0312 21.4891 18.125 21.0177 18.125 20.5417L14.5 20.5417H10.875Z" fill="#223F80"/>
                    </svg>
                    <svg id="notifCircle" version="1.1"  x="0px" y="0px" width="122.88px" height="122.88px" viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88">
                        <g>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z"/>
                        </g>
                    </svg>
                </div>

                <div className="icon">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" >
                        <rect x="19.3335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80" stroke-width="2" stroke-linejoin="round"/>
                        <rect x="4.8335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M4.8335 15.7083V19.3333" stroke="#223F80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.1665 15.7083V19.3333" stroke="#223F80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.1668 15.7083C24.1668 12.8241 23.1484 10.058 21.3355 8.01856C19.5227 5.9791 17.0639 4.83334 14.5002 4.83334C11.9364 4.83334 9.47765 5.9791 7.6648 8.01856C5.85195 10.058 4.8335 12.8241 4.8335 15.7083" stroke="#223F80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </nav>

        <div id="main">
            <div id="statusBar">
    
                <div id="statusButton">
                    <button className="statusButton" onClick={this.filterCustomers}>ALL</button>
                    <button className="statusButton" onClick={this.filterCustomers}>ACTIVE</button>
                    <button className="statusButton" onClick={this.filterCustomers}>PENDING</button>
                    <button className="statusButton" onClick={this.filterCustomers}>INACTIVE</button>
                </div>
    
            </div> 
    
            <hr id="statusBarEdge"/>

            <div id="searchBarDiv">
                <div id="searchBar">
                    <img id="icon" src={require("./images/search.svg")} alt="search icon"/>
                    <input type="text" name='searchBar' onChange={this.changeInVal} id="searchField"/>
                </div>

                <button>
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" >
                        <path d="M5 12L5 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <path d="M19 20L19 18" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <path d="M5 20L5 16" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <path d="M19 12L19 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12 7L12 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12 20L12 12" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="5" cy="14" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="12" cy="9" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="19" cy="15" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            
    
            <div id="labelBar">
    
                <div id="labels">
                    <button className="label" name='name' onClick={this.sortCustomers}>Name</button>
                    <p className="label">Mobile</p>
                    <p className="label">Status</p>
                    <button className="label" name='date' onclick={this.sortCustomers}>Added Date</button>
                </div>
    
            </div> 
    
            <div id='cardsList' className="scrolling-wrapperY">
                    {/*Customers list HERE*/}
{/* 
                <div className="cards">
                    <div className="info">
                        <p className="name">Sam</p>
                        <p className="mobile">+91 9443610472</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Inactive</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div> */}
    
                <div className="cards">
                    <div className="info">
                        <p className="name">Venkatan...</p>
                        <p className="mobile">+91 5489642356</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Processing</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">Narayanan</p>
                        <p className="mobile">+91 5489642356</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">dot</p>
                        <p className="mobile">+91 5489642356</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">YOYOYO</p>
                        <p className="mobile">+91 9443610472</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">adfnias</p>
                        <p className="mobile">+91 9443610472</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">Deekay</p>
                        <p className="mobile">+91 9443610472</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>

                
                <div className="cards">
                    <div className="info">
                        <p className="name">dot</p>
                        <p className="mobile">+91 5489642356</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">YOYOYO</p>
                        <p className="mobile">+91 9443610472</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">adfnias</p>
                        <p className="mobile">+91 9443610472</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div>
    
                <div className="cards">
                    <div className="info">
                        <p className="name">Deekay</p>
                        <p className="mobile">+91 9443610472</p>
                        <div className="flex-row">
                            <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" >
                                <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                            </svg>
                            <p className="status">Active</p>
                        </div>
                        <p className="date">22/02/2023</p>
                    </div>
                </div> 

        </div>

        
        <div className="fixed">    
            <button id="add">
                <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
                    <g filter="url(#filter0_d_137_1936)">
                    <circle cx="32.5" cy="28.5" r="28.5" fill="url(#paint0_linear_137_1936)"/>
                    </g>
                    <path d="M18 29.5H48" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M33 14V44" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <filter id="filter0_d_137_1936" x="0" y="0" width="65" height="65" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_137_1936"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_137_1936" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_137_1936" x1="14" y1="50.5" x2="58" y2="4" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0016027" stop-color="#223F80"/>
                    <stop offset="0.272219" stop-color="#444584"/>
                    <stop offset="1" stop-color="#BB2230"/>
                    </linearGradient>
                    </defs>
                </svg>
            </button>
        </div>
        </div>

        <div id="addCustomer">
        <div id="addBox">
            <button id="closeIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" fill="#7B86A7" fill-opacity="0.25" />
                <path d="M16 8L8 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 8L16 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <div class="inputFields">
                <p class="label">Name</p>
                <input required class="field" type="text"/>

                <p class="label">Designation</p>
                <input class="field" type="text"/>

                <p class="label">Mobile number</p>
                <input class="field" type="number"/>

                <p class="label">Email ID</p>
                <input class="field" type="email" id="email"/>

                <p class="label">Gender</p>
                <div class="dropDownDiv field">
                <select name="gender">
                    <option value="" disabled selected>Select your option</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                </select>
                <img src={require("../images/arwDwn.png")} alt=""/>
                </div>

            <p class="label">Date of Birth</p>
            <div id="dobField">
            <input type="date" class="field" />
            </div>

            <p class="label">Marital status</p>
            <div class="dropDownDiv field">
            <select class="select" name="gender">
                <option value="" disabled selected>Select your option</option>
                <option value="0">Single</option>
                <option value="1">Married</option>
                <option value="2">Widowed</option>
                <option value="3">Divorced</option>
            </select>
            <img src={require("../images/arwDwn.png")} alt=""/>
            </div>


            <button class="Button">
            ADD CLIENT
            </button>
      </div>
    </div>
  </div>

  <div id="filter">
    <div id="filterBox">
      <button id="closeIcon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" fill="#7B86A7" fill-opacity="0.25" />
          <path d="M16 8L8 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8 8L16 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div id="filterLabels">
        <button class="fLabel">xxxxxx</button>
        <button class="fLabel">askdba</button>
        <button class="fLabel">asd</button>
        <button class="fLabel">asdasdfawvf</button>
        <button class="fLabel">asdasd</button>
      </div>
    </div>
  </div>
</section>
        )
    }
}

export default WithRouter(HomeComp)