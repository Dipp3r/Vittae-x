import React from "react";
import { WithRouter } from "../routingWrapper";
import "../styles/profileInfo.css"
// import arwDwn from "../images/arwDwn.png"
// import profile from "../images/profile.png";
// import subtract from "../images/Subtract.svg";
import dateToString from "../dateToString"
import bankList from "../banksList.json"
class ProfileInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          first_name:localStorage.getItem('first_name'),
          last_name:localStorage.getItem('last_name') === null?'':this.props.getItem('last_name'),
          phone:localStorage.getItem('phone'),
          email:localStorage.getItem('email'),
          date_of_birth:dateToString(new Date(localStorage.getItem('date_of_birth')),2).replace(/ /g,"-"),
          place_of_birth_name: "",
          bank_name: "",
          account_number: "",
          ifsc: ""
        }
        this.save = this.save.bind(this)
        this.changeInVal = this.changeInVal.bind(this)
    }
    changeInVal(e){
      let obj = {};
      let value
      if (e.currentTarget.name  === "place_of_birth_name" || e.currentTarget.name  === "bank_name"){
        value = e.currentTarget.value
      }else{
        value = e.currentTarget.value.trim()
      }
      obj[e.currentTarget.name] = value;
      console.log(obj)
      this.setState(obj);
  }
    save(){
      console.log('save clicked')
      let bankInp = document.querySelector("#bankInp")
      let banksList = document.querySelector("#banks").options
      let isBankMatched = false
      for (let bank of banksList){
        if(bankInp.value  === bank.value) {
          isBankMatched = true
          break;
        }
      }      
      if(!isBankMatched){
        bankInp.style.borderColor = "red"
      }else{
        bankInp.style.borderColor = "#b8b8b8"
      }

      let data = {...this.state}
      delete data.phone
      delete data.email
      console.log(data)
      
      fetch(`http://dev.api.vittae.money/broker/personal-info-update/${localStorage.getItem("id")}/`,{
      method:'PATCH',
      body:JSON.stringify(data),
      headers: {
        "Authorization":`Passcode ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
        'Connection':"keep-alive"}
      })
      .then((response)=>{
        if(response.status  === 200){
          localStorage.setItem("first_name",data.first_name)
          localStorage.setItem("last_name",data.last_name)
          this.props.navigate("../profile")
        }

      })
    }
    componentDidMount(){
      fetch(`http://dev.api.vittae.money/broker/personal-info/${localStorage.getItem("id")}/`,{
        method:"GET",
        headers: {
        "Authorization":`Passcode ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
        'Connection':"keep-alive"}
      })
      .then(response=>{return response.json()})
      .then((data)=>{
        this.setState(data)
      })
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
              <p id="profileName">{`${localStorage.getItem("first_name")[0].toUpperCase()}${localStorage.getItem("last_name")[0].toUpperCase()}`}</p>
                {/* <div id="edit"><img src={subtract}  alt="profile picture"/></div> */}
              </div>
            </div>
          
            <div class="inputField">
              <p class="label">First name</p>
              <input class="field" type="text" name="first_name" value={this.state.first_name} onChange={this.changeInVal}/>
              <p class="label">Last name</p>
              <input class="field" type="text" name="last_name" value={this.state.last_name} onChange={this.changeInVal}/>
          
              <p class="label">Date of Birth</p>
              <div id="dobField">
                <input type="date" class="field date" name="date_of_birth" value={this.state.date_of_birth} onChange={this.changeInVal}/>
              </div>
              <p class="label">Phone</p>
              <input class="field" type="text" value={this.state.phone} disabled/>
              
              <p class="label">Email</p>
              <input class="field" type="text" value={this.state.email} disabled/>
              
              <p class="label">Place of birth</p>
              <input class="field" type="text" name="place_of_birth_name" value={this.state.place_of_birth_name} onChange={this.changeInVal}/>
          
              <p class="label">Bank name</p>
              <input id="bankInp" class="field updateInputField" list="banks" name="bank_name" type="text" value={this.state.bank_name} onChange={this.changeInVal} autocomplete="on"/>
          <datalist id="banks">
            {bankList.map((e)=>{
              
              return <option value={e} />
            })}
            
            </datalist>
              <p class="label">Account number</p>
              <input class="field updateInputField" name="account_number" type="number" value={this.state.account_number} onChange={this.changeInVal}/>
          
              <p class="label">IFSC Code</p>
              <input class="field updateInputField" type="text" name="ifsc" value={this.state.ifsc} onChange={this.changeInVal}/>
          
              <button id="saveButton" onClick={this.save}>
                save
              </button>
            </div>
          </section>
        )
    }
}

export default WithRouter(ProfileInfo)