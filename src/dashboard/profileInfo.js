import React from "react";
import { WithRouter } from "../routingWrapper";


class ProfileInfo extends React.Component{
    constructor(props){
        super(props)
        this.save = this.save.bind(this)
    }
    save(){
        console.log('save clicked')
    }
    render(){
        return(
            <section id="profileInfo">
            <div id="backButtonDiv" onClick={this.props.navigate} value='../profile' >
              <button id="backButton">
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
                <img src={require("../images/profile.png")} id="profilePageImg" alt="profile picture" />
              </div>
            </div>
          
            <div class="inputField">
              <p class="label">first_name</p>
              <input class="field" type="text" value={this.props.getItem('first_name')} />
              <p class="label">last_name</p>
              <input class="field" type="text" value={this.props.getItem('last_name') == null?'':this.props.getItem('last_name')} />
          
              <p class="label">Date of Birth</p>
              <div id="dobField">
                <input type="date" class="field"/>
              </div>
          
              <p class="label">Place of birth</p>
              <input class="field" type="text"/>
          
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