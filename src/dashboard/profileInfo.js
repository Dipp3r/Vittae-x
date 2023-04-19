import React from "react";
import { WithRouter } from "../routingWrapper";
import "../styles/profileInfo.css"
import arwDwn from "../images/arwDwn.png"
import profile from "../images/profile.png";
import subtract from "../images/Subtract.svg";
import dateToString from "../dateToString"
class ProfileInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          first_name:localStorage.getItem('first_name'),
          last_name:localStorage.getItem('last_name')== null?'':this.props.getItem('last_name'),
          phone:localStorage.getItem('phone'),
          email:localStorage.getItem('email'),
          date_of_birth:dateToString(new Date(localStorage.getItem('date_of_birth')),2).replace(/ /g,"-")
        }
        this.save = this.save.bind(this)
    }
    save(){
        console.log('save clicked')
    }
    render(){
        return(
            <section id="profileInfo">
            <div id="backButtonDiv"  >
              <button id="backButton" onClick={this.props.navigate} value='../profile'>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.1665 12.5L3.4594 11.7929L2.75229 12.5L3.4594 13.2071L4.1665 12.5ZM19.7915 13.5C20.3438 13.5 20.7915 13.0523 20.7915 12.5C20.7915 11.9477 20.3438 11.5 19.7915 11.5V13.5ZM9.7094 5.54289L3.4594 11.7929L4.87361 13.2071L11.1236 6.95711L9.7094 5.54289ZM3.4594 13.2071L9.7094 19.4571L11.1236 18.0429L4.87361 11.7929L3.4594 13.2071ZM4.1665 13.5H19.7915V11.5H4.1665V13.5Z"
                    fill="black" fill-opacity="0.79" />
                </svg>
                <p>Personal Info</p>
              </button>
            </div>
          
            <div id="profileDiv">
              <div id="profileBox">
                <img src={profile} id="profilePageImg" alt="profile picture" />
                <div id="edit"><img src={subtract}  alt="profile picture"/></div>
              </div>
            </div>
          
            <div class="inputField">
              <p class="label">First name</p>
              <input class="field" type="text" value={this.state.first_name} disabled/>
              <p class="label">Last name</p>
              <input class="field" type="text" value={this.state.last_name} disabled/>
          
              <p class="label">Date of Birth</p>
              <div id="dobField">
                <input type="date" class="field date" value={this.state.date_of_birth} disabled/>
              </div>
              <p class="label">Phone</p>
              <input class="field" type="text" value={this.state.phone} disabled/>
              
              <p class="label">Email</p>
              <input class="field" type="text" value={this.state.email} disabled/>
              
              <p class="label">Place of birth</p>
              <input class="field" type="text"/>
          
              <p class="label">Account name</p>
              <input class="field" type="text"/>
          
              <p class="label">Account number</p>
              <input class="field" type="number"/>
          
              <p class="label">IFSC Code</p>
              <input class="field" type="text"/>
          
              <button id="saveButton" onClick={this.save}>
                save
              </button>
            </div>
          </section>
        )
    }
}

export default WithRouter(ProfileInfo)