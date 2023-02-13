import React from 'react';
import ReactDOM from 'react-dom/client';
import { WithRouter } from './routingWrapper';

class HomeComp extends React.Component{
    constructor(){
        super()
        this.state = {

        }
        this.getListOFCustomers = this.getListOFCustomers.bind(this);
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
    render(){

        return(
            <section id="dashboard">
            <nav className="navbar">
                <div className="profile">
                    <img id="profileImg" src={require("./images/profile.png")} alt="profile picture"/>
                </div>

                <div className="icons">
                    <div>
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="19.3335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80" stroke-width="2" stroke-linejoin="round"/>
                            <rect x="4.8335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80" stroke-width="2" stroke-linejoin="round"/>
                            <path d="M4.8335 15.7083V19.3333" stroke="#223F80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M24.1665 15.7083V19.3333" stroke="#223F80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M24.1668 15.7083C24.1668 12.8241 23.1484 10.058 21.3355 8.01856C19.5227 5.9791 17.0639 4.83334 14.5002 4.83334C11.9364 4.83334 9.47765 5.9791 7.6648 8.01856C5.85195 10.058 4.8335 12.8241 4.8335 15.7083" stroke="#223F80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    
                    <div className="iconBox">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.7913 9.62971C8.17113 6.21122 11.0606 3.625 14.5002 3.625C17.9397 3.625 20.8292 6.21122 21.209 9.62971L21.5133 12.3681C21.5571 12.7627 21.579 12.96 21.6103 13.1539C21.7513 14.0288 22.0366 14.8741 22.4547 15.6555C22.5474 15.8287 22.6495 15.9989 22.8538 16.3394L23.5578 17.5127C24.3635 18.8556 24.7664 19.5271 24.4792 20.0344C24.1919 20.5417 23.4089 20.5417 21.8428 20.5417H7.15754C5.59143 20.5417 4.80837 20.5417 4.52114 20.0344C4.23392 19.5271 4.63679 18.8556 5.44255 17.5127L6.14653 16.3394C6.3508 15.9989 6.45293 15.8287 6.54563 15.6555C6.96369 14.8741 7.24904 14.0288 7.39001 13.1539C7.42127 12.96 7.44319 12.7627 7.48704 12.3681L7.7913 9.62971Z" fill="#223F80"/>
                            <path d="M10.875 20.5417C10.875 21.0177 10.9688 21.4891 11.1509 21.9289C11.3331 22.3687 11.6001 22.7683 11.9367 23.1049C12.2734 23.4415 12.673 23.7085 13.1128 23.8907C13.5526 24.0729 14.024 24.1667 14.5 24.1667C14.976 24.1667 15.4474 24.0729 15.8872 23.8907C16.327 23.7085 16.7266 23.4415 17.0633 23.1049C17.3999 22.7683 17.6669 22.3687 17.8491 21.9289C18.0312 21.4891 18.125 21.0177 18.125 20.5417L14.5 20.5417H10.875Z" fill="#223F80"/>
                        </svg>
                        <svg id="notifCircle" version="1.1" x="0px" y="0px" width="122.88px" height="122.88px" viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88">
                            <g>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z"/>
                            </g>
                        </svg>
                    </div>
                    
                        
                </div>
            </nav>

            <div id="main">
                <div className="scrolling-wrapperX">
                    <div className="cards">
                        <div className="info">
                            <p className="p1">$120.5</p>
                            <p className="p2">Commissions from clients</p>
                        </div>
                    </div>
        
                    <div className="cards">
                        <div className="info">
                            <p className="p1">86/100</p>
                            <p className="p2">Number of customers</p>
                        </div>
                    </div>
                </div>
        
                <div id="statusBar">
        
                    <div id="statusButton">
                        <button className="statusButton">ALL</button>
                        <button className="statusButton">ACTIVE</button>
                        <button className="statusButton">PENDING</button>
                        <button className="statusButton">DEAD</button>
                    </div>
        
                    <div className="menu">
                        <button>
                            <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="1.5" cy="1.5" r="1.5" fill="none"/>
                                <circle cx="1.5" cy="7.5" r="1.5" fill="none"/>
                                <circle cx="1.5" cy="13.5" r="1.5" fill="none"/>
                            </svg>
                        </button>
        
                    </div>
        
                </div> 
        
                <hr id="statusBarEdge"/>
        
                <div id="searchBar">
                    <img id="icon" src={require("./images/Search.svg")} alt="eye icon"/>
                    <input type="text" id="searchField"/>
                </div>
        
                <div id="labelBar">
        
                    <div id="labels">
                        <p className="label">Name</p>
                        <p className="label">Mobile</p>
                        <p className="label">Status</p>
                        <p className="label">Added Date</p>
                    </div>
        
                </div> 
        
                <div className="scrolling-wrapperY">
                    <div className="cards">
                        <div className="info">
                            <p className="name">Deekay</p>
                            <p className="mobile">+91 9443610472</p>
                            <div className="flex-row">
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                                </svg>
                                <p className="status">Active</p>
                            </div>
                            <p className="date">22/02/2023</p>
                        </div>
                    </div>
        
                    <div className="cards">
                        <div className="info">
                            <p className="name">Sam</p>
                            <p className="mobile">+91 9443610472</p>
                            <div className="flex-row">
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="2.86855" cy="2" rx="2.05263" ry="2" fill="#6BDA7D"/>
                                </svg>
                                <p className="status">Inactive</p>
                            </div>
                            <p className="date">22/02/2023</p>
                        </div>
                    </div>
        
                    <div className="cards">
                        <div className="info">
                            <p className="name">Venkatan...</p>
                            <p className="mobile">+91 5489642356</p>
                            <div className="flex-row">
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <svg className="down" width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <circle cx="12" cy="12" r="9" fill="#7B86A7" fill-opacity="0.25"/>
                            <path d="M16 8L8 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 8L16 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <p id="newClientTxt">CREATE NEW CLIENT</p>

                    <div className="inputFields">
                        <p className="label">Name</p>
                        <input className="field" type="text"/>

                        <p className="label">Mobile number</p>
                        <input className="field" type="number"/>

                        <p className="label">Email ID</p>
                        <input className="field" type="text"/>

                        <button className="Button">
                            CREATE CLIENT
                        </button>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default WithRouter(HomeComp)