import React from "react";
import { WithRouter } from "../routingWrapper";

class ContactsComp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          addClientMenu:'none',
          filterMenu:'none',
          name:'',
          mobile:'',
          mail:'',
          designation:'',

        }
        this.customerList = [{name:'aaa sfkeeb jksefkj nsejkfnjk snefjk ',mobile:'1234567123',status:'active',date:'01/02/2002'},
        {name:'bbb',mobile:'1234567812',status:'active',date:'01/02/2002'},
        {name:'ccc',mobile:'1234567820',status:'active',date:'01/02/2002'},
        {name:'ddd',mobile:'1234547890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'}];
        this.displayCustomer = this.displayCustomer.bind(this)
        this.displayMessage = this.displayMessage.bind(this)
        this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
        this.toggleAddClientMenu = this.toggleAddClientMenu.bind(this)
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
    }
    displayMessage(){
      let messageBox = document.querySelector('#messageBox')

      let message = document.createElement('p')
      message.id = 'message'
      message.innerText = 'copied to clipboard'
      messageBox.appendChild(message)
      setTimeout(()=>{
        messageBox.removeChild(message)
      },1000*2)
    }
    toggleAddClientMenu(){
      // console.log('toggled')
      let menu = 'none'
      if(this.state.addClientMenu == 'none'){
        menu = 'flex'
      }
      this.setState({addClientMenu:menu})
    } 
    toggleFilterMenu(){      
      let menu = 'none'
      if(this.state.filterMenu == 'none'){
        menu = 'flex'
      }
      this.setState({filterMenu:menu})
    }
    changeInVal(e){
        let obj = {};
        // console.log(e.keyCode)
        if(e.keyCode == 13){
          this.submit()
        }
        obj[e.currentTarget.name] = e.currentTarget.value.trim();
        // console.log(obj)
        this.setState(obj);
    }
    displayCustomer(){
        let container = document.body.querySelector('#cardsList')
        container.innerHTML = ''

        for(let i of this.customerList){
            let cards = document.createElement('button')
            cards.className = 'cards'
            let details = document.createElement('div')
            details.className = 'details'

            let name = document.createElement('div')
            name.className = 'info'
            let mobile = document.createElement('button')
            mobile.className = 'info'
            

            let status = document.createElement('div')
            status.className = 'info status'
            let statusIcon = document.createElement('i')
            statusIcon.className = 'down'
            status.append(statusIcon)
            statusIcon.innerText = '.'

            let dateButton = document.createElement('div')
            dateButton.className = 'info dateDiv'
            let date = document.createElement('p')
            date.className = 'date'
            let filterTag = document.createElement('div')
            filterTag.className = 'filterTag'
            dateButton.appendChild(filterTag)
            dateButton.appendChild(date)

            if (i.name.length > 10){
                name.innerText = i.name.slice(0,10)+"..."
            }else{
                name.innerText = i.name
            }

            mobile.innerText = i.mobile
            date.innerText = i.date
            status.innerText = i.status
            mobile.innerText = i.mobile
            // mobile.href=`tel:${i.mobile}`
            mobile.value = i.mobile
            mobile.onclick = (e)=>{
              e.stopPropagation()
              navigator.clipboard.writeText(mobile.value)
              this.displayMessage()
            }
          
            details.appendChild(name)
            details.appendChild(mobile)
            details.appendChild(status)
            details.appendChild(dateButton)
            
            cards.appendChild(details)
            cards.value = '../customerview'
            cards.onclick = this.props.navigate

            container.appendChild(cards);
            console.log(cards)
        }
    }
    submit(){
      console.log(this.state)
      this.toggleAddClientMenu()
    }
    componentDidMount(){
      this.displayCustomer()
    }
    render(){
      console.log(this.state)
        return(
            <div id='contactMain' >
            <div id="statusBar">
                <div id="statusButton">
                  <button class="statusButton">ALL</button>
                  <button class="statusButton">ACTIVE</button>
                  <button class="statusButton">PENDING</button>
                  <button class="statusButton">INACTIVE</button>
                </div>
          
              </div>
          
              <hr id="statusBarEdge" />
          
              <div id="searchBarDiv">
                <div id="searchBar">
                  <img id="icon" src={require("../images/search.svg")} alt="eye icon"/>
                  <input type="text" id="searchField" />
                </div>
          
                <button onClick={this.toggleFilterMenu}  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L5 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M19 20L19 18" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M5 20L5 16" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M19 12L19 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M12 7L12 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M12 20L12 12" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <circle cx="5" cy="14" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <circle cx="12" cy="9" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <circle cx="19" cy="15" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
          
          
              <div id="labelBar">
          
                <div id="labels">
                  <button class="label">Name</button>
                  <p class="label">Mobile</p>
                  <p class="label">Status</p>
                  <button class="label">Added Date</button>
                </div>
          
              </div>
          
              <div class="scrolling-wrapperY" id="cardsList">
                {/* list of customers HERE  */}
              </div>

              <div id="addCustomer" style={{'display':`${this.state.addClientMenu}`}}  >
              <div id="addBox">
                <button id="closeIcon" onClick={this.toggleAddClientMenu}  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" fill="#7B86A7" fill-opacity="0.25" />
                    <path d="M16 8L8 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 8L16 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
          
                <div className="inputFields">
                  <p className="label">Name</p>
                  <input required className="field" type="text" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='name' />
          
                  <p className="label">Designation</p>
                  <input className="field" type="text" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='designation'/>
          
                  <p className="label">Mobile number</p>
                  <input className="field" type="number" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='mobile'   />
          
                  <p className="label">Email ID</p>
                  <input className="field" type="email" id="email" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='mail' />
          
                  <p className="label">Gender</p>
                  <div className="dropDownDiv field">
                    <select name="gender" onChange={this.changeInVal} >
                      <option value="" disabled selected>Select your option</option>
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                      <option value="2">Other</option>
                    </select>
                    <img src={require("../images/arwDwn.png")} alt=""/>
                  </div>
          
                  <p className="label">Date of Birth</p>
                  <div id="dobField">
                    <input type="date" className="field" onChange={this.changeInVal} name='date'  />
                  </div>
          
                  <p className="label">Marital status</p>
                  <div className="dropDownDiv field"   >
                    <select className="select" name="gender" onChange={this.changeInVal}  >
                      <option value="" disabled selected>Select your option</option>
                      <option value="0">Single</option>
                      <option value="1">Married</option>
                      <option value="2">Widowed</option>
                      <option value="3">Divorced</option>
                    </select>
                    <img src={require("../images/arwDwn.png")} alt="arrowDown" />
                  </div>
          
          
                  <button className="Button" onClick={this.submit}  >
                    ADD CLIENT
                  </button>
                </div>
            </div>
            </div>
            
            <div id="filter"  style={{'display':`${this.state.filterMenu}`}}   >
                <div id="filterBox">
                    <button id="closeIcon" onClick={this.toggleFilterMenu} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                        <circle cx="12" cy="12" r="9" fill="#7B86A7" fill-opacity="0.25" />
                        <path d="M16 8L8 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 8L16 16" stroke="#222222" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
          
                    <div id="filterLabels">
                    <button className="fLabel">xxxxxx</button>
                    <button className="fLabel">askdba</button>
                    <button className="fLabel">asd</button>
                    <button className="fLabel">asdasdfawvf</button>
                    <button className="fLabel">asdasd</button>
                    </div>
                </div>
            </div>

              <div id='messageBox'> 
              {/* copied to clip board messages will be displayed HERE */}
              </div>
              <button id="add" onClick={this.toggleAddClientMenu} > <img src={require("../images/plus.png")} alt="add customer button"/></button>
            </div>
        )
    }
}
export default WithRouter(ContactsComp)