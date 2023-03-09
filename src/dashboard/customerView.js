import React from "react";
import { WithRouter } from "../routingWrapper";

class CustomerView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
           section:0,
           customer:{}
        }
        this.changeSection = this.changeSection.bind(this)
        this.displaySection = this.displaySection.bind(this)
    }
    getCustomerDetail(){
        // let url = ""
        // fetch(url)
        // .then(()=>{})
    }
    changeSection(e){
        let obj = {}
        obj.section = e.currentTarget.value
        let target = e.currentTarget
        target.style.color = '#223F80'
        target.style.fontWeight = '600'
        target.style.borderBottom = '2px solid rgba(34, 64, 128, 0.7176470588)'

        this.setState(obj)
        this.displaySection(e.currentTarget.value)
    }
    displaySection(value){
        console.log(this.state)
        // let info = document.querySelector('#info')
        // info.style.display = 'none'
        let infoContent = document.querySelector('#infoContent')
        infoContent.style.display = 'none'
        let kycStatus = document.querySelector('#kycStatus')
        kycStatus.style.display = 'none'
        let notesContent = document.querySelector('#notesContent')
        notesContent.style.display = 'none'

        switch(value){
            case '1':
                infoContent.style.display = 'grid'
                break;
            case '2':
                kycStatus.style.display = 'flex'
                break;
            case '3':
                notesContent.style.display = 'grid'
                break;
        }
    }
    componentDidMount(){
        let obj = this.props.getItem("currentCustomerView")
        obj.designation = 'XXX'
        console.log(obj)
        this.setState({customer:obj})
    }
    render(){
        return(
            <section id="Client">
                <nav class="navbar">
                    <button class="profile">
                    <img id="profileImg" src={require("../images/profile.png")} alt="" />
                    </button>

                    <div class="icons">
                    <button class="icon">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
                        <rect x="19.3335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80"
                            stroke-width="2" stroke-linejoin="round" />
                        <rect x="4.8335" y="14.5" width="4.83333" height="8.45833" rx="2.41667" fill="#223F80" stroke="#223F80"
                            stroke-width="2" stroke-linejoin="round" />
                        <path d="M4.8335 15.7083V19.3333" stroke="#223F80" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M24.1665 15.7083V19.3333" stroke="#223F80" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M24.1668 15.7083C24.1668 12.8241 23.1484 10.058 21.3355 8.01856C19.5227 5.9791 17.0639 4.83334 14.5002 4.83334C11.9364 4.83334 9.47765 5.9791 7.6648 8.01856C5.85195 10.058 4.8335 12.8241 4.8335 15.7083"
                            stroke="#223F80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>

                    <button class="icon iconBox">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.7913 9.62971C8.17113 6.21122 11.0606 3.625 14.5002 3.625C17.9397 3.625 20.8292 6.21122 21.209 9.62971L21.5133 12.3681C21.5571 12.7627 21.579 12.96 21.6103 13.1539C21.7513 14.0288 22.0366 14.8741 22.4547 15.6555C22.5474 15.8287 22.6495 15.9989 22.8538 16.3394L23.5578 17.5127C24.3635 18.8556 24.7664 19.5271 24.4792 20.0344C24.1919 20.5417 23.4089 20.5417 21.8428 20.5417H7.15754C5.59143 20.5417 4.80837 20.5417 4.52114 20.0344C4.23392 19.5271 4.63679 18.8556 5.44255 17.5127L6.14653 16.3394C6.3508 15.9989 6.45293 15.8287 6.54563 15.6555C6.96369 14.8741 7.24904 14.0288 7.39001 13.1539C7.42127 12.96 7.44319 12.7627 7.48704 12.3681L7.7913 9.62971Z"
                            fill="#223F80" />
                        <path
                            d="M10.875 20.5417C10.875 21.0177 10.9688 21.4891 11.1509 21.9289C11.3331 22.3687 11.6001 22.7683 11.9367 23.1049C12.2734 23.4415 12.673 23.7085 13.1128 23.8907C13.5526 24.0729 14.024 24.1667 14.5 24.1667C14.976 24.1667 15.4474 24.0729 15.8872 23.8907C16.327 23.7085 16.7266 23.4415 17.0633 23.1049C17.3999 22.7683 17.6669 22.3687 17.8491 21.9289C18.0312 21.4891 18.125 21.0177 18.125 20.5417L14.5 20.5417H10.875Z"
                            fill="#223F80" />
                        </svg>
                        <svg id="notifCircle" version="1.1" x="0px" y="0px" width="122.88px" height="122.88px"
                        viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88">
                        <g>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z" />
                        </g>
                        </svg>
                    </button>
                    </div>
                </nav>

                <div id="main">
                    <div id="info">
                    <div id="portion1">
                        <div id="portion1Left">
                        <img src={require("../images/arrow_left_white.svg")} alt="left arrow" onClick={this.props.navigate} value='../dashboard'  />
                        <div id="deets">
                            <p id="name">{this.state.customer.name}</p>
                            <p id="designation">{this.state.customer.designation}</p>
                            <div id="statusDiv">
                            <p id="statusDot">.</p>
                            <p id="statusTxt">{this.state.customer.status}</p>
                            </div>
                        </div>
                        </div>
                        
                        <div id="portion1Right">
                        <div id="dateBox">
                            <p id="dateTxt">Added {this.state.customer.date}</p>
                            <button>
                            <img src={require("../images/three-dots.svg")} alt=""/>
                            </button> 
                        </div>
                        <button id="edit">
                            Edit
                        </button>
                        </div>
                    </div>

                    <div id="portion2">
                        <button class="contact">
                        <img src={require("../images/call.svg")} alt="mobile"/>
                        <a href={'tel:'+this.state.customer.phone} >Call</a>
                        </button>

                        <button class="contact">
                        <img src={require("../images/Message.svg")} alt="mail"/>
                        <a href={'mail:'+this.state.customer.mail} >Mail</a>
                        </button>
                    </div>
                    </div>
                    <div id="statusBar">
                    <div id="statusButton">
                        <button class="statusButton" value='1' onClick={this.changeSection} style={{color:'#6D7593',fontWeight:'500',borderBottom:'2px solid white'}} >INFO</button>
                        <button class="statusButton" value='2' onClick={this.changeSection}style={{color:'#6D7593',fontWeight:'500',borderBottom:'2px solid white'}} >KYC STATUS</button>
                        <button class="statusButton" value='3' onClick={this.changeSection}style={{color:'#6D7593',fontWeight:'500',borderBottom:'2px solid white'}} >NOTES</button>
                        <button class="statusButton" value='4' onClick={this.changeSection}style={{color:'#6D7593',fontWeight:'500',borderBottom:'2px solid white'}} >TASKS</button>
                    </div>
                    </div>

                    <div id="infoContent">
                    <p class="infoLabel">Personal info</p>
                    <div class="infolDiv">
                        <div class="grid-container">
                        <div class="grid-item">Name</div>
                        <div class="grid-item info">Deekay</div>
                        <div class="grid-item">Date of birth</div>  
                        <div class="grid-item info">49872398479</div>
                        <div class="grid-item">Age</div>
                        <div class="grid-item info">15</div>  
                        <div class="grid-item">Gender</div>
                        <div class="grid-item info">Male</div>
                        <div class="grid-item">Marital status of the person</div>
                        <div class="grid-item emptyInfo">-</div>   
                        </div>
                    </div>

                    <p class="infoLabel">Contact info</p>
                    <div class="infoDiv">
                        <div class="grid-container">
                        <div class="grid-item">Mobile number</div>
                        <div class="grid-item info">1234567890</div>
                        <div class="grid-item">Email id</div>  
                        <div class="grid-item info">deeky@gmail.com</div>   
                        </div>
                    </div>

                    <p class="infoLabel">Document details</p>
                    <div class="infoDiv">
                        <div class="grid-container">
                        <div class="grid-item">Pan number</div>
                        <div class="grid-item emptyInfo">-</div>
                        <div class="grid-item">Adhaar number</div>  
                        <div class="grid-item info">#### #### ####</div>  
                        </div>
                    </div>

                    <p class="infoLabel">Document details</p>
                    <div class="infoDiv">
                        <div class="grid-container">
                        <div class="grid-item">Account name</div>
                        <div class="grid-item info">Deekay</div>
                        <div class="grid-item">Bank name</div>  
                        <div class="grid-item info">####</div>
                        <div class="grid-item">Account number</div>  
                        <div class="grid-item info">##########</div>  
                        <div class="grid-item">IFSC Code</div>  
                        <div class="grid-item info">#######</div>  
                        </div>
                    </div>
                    </div>

                    <div id='kycStatus'>

                    </div>

                    <div id="notesContent">
                    <button id="add">
                        <img src={require("../images/plus.png")} alt="add customer button"/>
                    </button>
                    <div id="left">
                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                            Areyyyyyy fgkn fkgn k;mnfg adlg;mn adfg;lmnm fgkn dfjbg jabf io;;ad fhiodf p difhpd dp fihdf  phdfih dp’ a’hf hidh gkl fg ugh ; fgjh gl;  hgfi f fgf ldfgdifgeiu ildfgdufg agdfidgfid digfidfgi dlahifgidfg aldhgfidgf lidgidfdgfgds fgjob; hadf;ho adgo;h ag;oh iahgpihgigh iadugfu iughih fihf h9difyh 
                        </p>
                        </div>

                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                            adugfu iughih fihf h9difyh 
                        </p>
                        </div>

                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                            Areyyyyyy  fgkn dfjbg jabf io;;ad fhiodf p difhpd dp fihdf  phdfih dp’ a’hf hidh gkl fg ugh ; fgjh gl;  hgfi f fgf ldfgdifgeiu ildfgdufg agdfidgfid digfidfgi dlahifgidfg aldhgfidgf lidgidfdgfgds fgjob; hadf;ho adgo;h ah fihf h9difyh 
                        </p>
                        </div>

                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                        p fihdf  phdfih dp ahf hidh gkl fg ugh ; fgjh gl;  hgfi f fgf ldfgdifgeiu ildfgdufg agdfidgfid digfidfgi dlahifgidfg aldhgfidgf lidgidfdgfgds fgjob; hadf;ho adgo;h ag;oh iahgpihgigh iadugfu iughih fihf h9difyh 
                        </p>
                        </div>
                    </div>

                    <div id="right">
                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, eius. fihf h9difyh 
                        </p>
                        </div>

                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic corporis asperiores ut soluta, sint dolores esse illo aut eius unde error deserunt delectus a perferendis molestiae repellendus, consectetur at inventore.
                        </p>
                        </div>

                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo sapiente necessitatibus optio eveniet eum nam ut blanditiis iste praesentium? Possimus eum dicta aliquid nulla rerum esse asperiores quas sint quisquam est voluptas perspiciatis incidunt, eligendi ipsam distinctio sit maiores? At, molestias laborum aut officiis atque sint ex alias soluta unde.
                        </p>
                        </div>

                        <div class="note">
                        <p id="title">HTML</p>
                        <p id="content">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor laudantium minus praesentium quas delectus alias tenetur maiores harum cupiditate soluta. Omnis doloribus, perferendis ex dolorem dicta, nulla perspiciatis error praesentium iure alias libero tenetur recusandae illo, totam accusamus magnam sed autem dolores. Sunt porro eligendi necessitatibus? Illum sit quo ipsa natus deserunt unde, accusamus dolorum necessitatibus suscipit vero minima, vitae porro placeat fuga nemo, aliquam omnis quibusdam pariatur impedit laudantium. Itaque nihil natus, quos quia eius eveniet neque voluptate porro rem maiores facere blanditiis voluptatum adipisci fuga praesentium tempora temporibus doloremque laudantium nesciunt. Accusantium recusandae laborum quam facere at illum?
                        </p>
                        </div>
                    </div>
                    </div>

                    
                </div>
                </section>
        )
    }
}

export default WithRouter(CustomerView)