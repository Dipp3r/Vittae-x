import { stat } from "fs";
import React from "react";
import { WithRouter } from "../routingWrapper";
class ContactsComp extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        // this.state = {
        //   addClientMenu:'none',
        //   filterMenu:'none',
        //   userInfo:{
        //     name:'',
        //     mobile:'',
        //     mail:'',
        //     designation:'',
        //   },
        //   filterProps:{
        //     status:0,
        //     sort: 'dateDesc',
        //     tag:[]
        //   }
        // }
        this.customerList = [
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
        {id:14,name:'eee',mobile:'1234347890',status:2,date:'02/06/2002',tag:['tag4']}];
        this.displayCustomer = this.displayCustomer.bind(this)
        this.displayMessage = this.displayMessage.bind(this)
        this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
        this.toggleAddClientMenu = this.toggleAddClientMenu.bind(this)
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.openCustomerView = this.openCustomerView.bind(this)
        this.setFilterPropStatus = this.setFilterPropStatus.bind(this)
        this.filterAndSort = this.filterAndSort.bind(this)
        this.toggleFilterSort = this.toggleFilterSort.bind(this)
        this.searchInput = this.searchInput.bind(this)
        this.searchCustomer = this.searchCustomer.bind(this)
        this.setFilterPropsTag = this.setFilterPropsTag.bind(this)
        this.updateIndexState = this.updateIndexState.bind(this)
    }
    updateIndexState(){
      this.props.setItem({contactCompState:this.state})
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
      // 
      let menu = 'none'
      if(this.state.addClientMenu == 'none'){
        menu = 'flex'
      }
      this.setState({addClientMenu:menu},this.updateIndexState)
    } 
    toggleFilterMenu(){      
      let menu = 'none'
      if(this.state.filterMenu == 'none'){
        menu = 'flex'
      }
      this.setState({filterMenu:menu},this.updateIndexState)
    }
    toggleFilterSort(e){
      let sort = this.state.filterProps.sort
      switch (e.currentTarget.value) {
        case '1':
          if(sort == 'dateDesc') {
            sort = 'dateAsce'
          }else{
           sort = 'dateDesc'
          }
          break;
        case '2':
          if(sort == 'nameDesc') {
            sort = 'nameAsce'
          }else{
           sort = 'nameDesc'
          }
          break;
        default:
          if(sort == 'dateDesc') {
            sort = 'dateAsce'
          }else{
           sort = 'dateAsce'
          }
          break;
      }
      
      let filter = this.state.filterProps
      filter.sort = sort
      this.setState(filter,this.updateIndexState)
      this.filterAndSort(this.customerList)
    }
    changeInVal(e){
        let obj = {};
        // 
        if(e.keyCode == 13){
          this.submit()
        }
        obj[e.currentTarget.name] = e.currentTarget.value.trim();
        // 
        this.setState(obj,this.updateIndexState);
    }
    displayCustomer(customerList){
        let container = document.body.querySelector('#cardsList')
        container.innerHTML = ''
        let statusBackgroundColor
        for(let i of customerList){
            switch (i.status) {
              case 1:
                statusBackgroundColor = '#C4C4C4'
                break;
              case 2:
                statusBackgroundColor = '#DAC16B'
                break;
              case 3:
                statusBackgroundColor = '#6BDA7D'
                break;
              case 4:
                statusBackgroundColor = '#DA6B6B'
                break;
              default:
                statusBackgroundColor = '#C4C4C4'
                break;
            }

            let cards = document.createElement('button')
            cards.className = 'cards'
            let details = document.createElement('div')
            details.className = 'details'

            let name = document.createElement('div')
            name.className = 'info'
            name.id='name'
            let mobile = document.createElement('div')
            mobile.className = 'info'
            mobile.id = 'mobile'

            let status = document.createElement('div')
            status.className = 'info status'
            status.id = 'status'
            status.style.backgroundColor = statusBackgroundColor
            

            let dateButton = document.createElement('div')
            dateButton.className = 'info dateDiv'
            let date = document.createElement('p')
            date.className = 'date'
            date.id = 'date'
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
            // status.innerText = i.status
            
            details.appendChild(name)
            details.appendChild(mobile)
            details.appendChild(status)
            details.appendChild(dateButton)
            
            cards.appendChild(details)
            cards.value = i.id
            cards.onclick = this.openCustomerView

            container.appendChild(cards);
            // 
        }
    }
    openCustomerView(e){ 
      let target = e.currentTarget.value
      
      for (let i of this.customerList){
        if(i.id == target){
          this.props.setItem({contactCompState:this.state,currentCustomerView : i})
          this.props.navigate('../customerview')
          break;
        }
      }
      // this.props.setItem({currentCustomerView:{
      //   name:target.querySelector("#name").innerText,
      //   date:target.querySelector("#date").innerText,
      //   status:target.querySelector("#status").innerText,
      //   mobile:target.querySelector("#mobile").innerText
      // }})
    }
    setFilterPropsTag(e){
      let filterProps = this.state.filterProps
      let value = e.currentTarget.value
      let index = filterProps.tag.indexOf(value)
      if(index == -1){
        filterProps.tag.push(value)
        e.currentTarget.style.backgroundColor = '#223F80'
      }else{
        filterProps.tag.splice(index,1)
        e.currentTarget.style.backgroundColor = 'rgba(34, 63, 128, 0.4)'
      } 
      
      this.setState({filterProps:filterProps},this.updateIndexState)

      this.filterAndSort(this.customerList)
    }
    setFilterPropStatus(e){
      let filterProps = this.state.filterProps
      filterProps.status = e.currentTarget.value
      this.setState({filterProps:filterProps},this.updateIndexState)

      this.lastSelectedFilterButton.style.borderBottomColor = 'rgba(109, 117, 147, 1)'
      this.lastSelectedFilterButton.style.color = 'rgba(109, 117, 147, 1)'

      e.currentTarget.style.borderBottomColor = '#223f80'
      e.currentTarget.style.color = '#223f80'
      this.lastSelectedFilterButton =  e.currentTarget

      this.searchCustomer(this.customerList)
    }
    filterAndSort(customerList){
      let newCustomerList = customerList
      if(newCustomerList== undefined) return this.displayCustomer([])
      let filterProps = this.state.filterProps
      if(filterProps.status != '0'){
        newCustomerList = newCustomerList.filter((element)=>{return element.status == Number.parseInt(filterProps.status)})
      }
      
      
      switch (filterProps.sort) {
        case 'dateDesc':
          newCustomerList = newCustomerList.sort((a,b)=>{return new Date(b.date).getTime()-new Date(a.date).getTime()})
          break;
        case 'dateAsce':
          newCustomerList = newCustomerList.sort((a,b)=>{return new Date(a.date).getTime()-new Date(b.date).getTime()})
          break;
        case 'nameDesc':
          newCustomerList = newCustomerList.sort((a,b)=>{return b.name.localeCompare(a.name)})
          break;
        case 'nameAsce':
          newCustomerList = newCustomerList.sort((a,b)=>{return a.name.localeCompare(b.name)})
          break;  
        default:
          newCustomerList = newCustomerList.sort((a,b)=>{return new Date(b.date).getTime()-new Date(a.date).getTime()})
          break;
      }
      //filter by tag
      
      
      let string 
      newCustomerList = newCustomerList.filter((element)=>{
        string = element.tag.join(' ')
        let bool = true,newBool = false
        this.state.filterProps.tag.map((element)=> {
          newBool = new RegExp(element).test(string)
          bool = bool && newBool
        })
        // 
        return bool
      })
      // console.dir(newCustomerList)
      this.displayCustomer(newCustomerList)
    }
    submit(){
      
      this.toggleAddClientMenu()
    }
    componentDidMount(){
      let obj = this.props.getItem('contactCompState')
      this.setState(obj,()=>{
        this.searchCustomer()

        //styling filter tag by last session
        
        for(let i of  document.querySelector('#filterLabels').children){
          if (new RegExp(i.getAttribute("value")).test(this.state.filterProps.tag.join(" "))){
            i.style.backgroundColor = '#223F80'
          }else{
           i.style.backgroundColor = 'rgba(34, 63, 128, 0.4)'
          }
          
        }
        
        this.lastSelectedFilterButton = document.body.querySelector("#statusButton").children[0]
        //styling filter status by last session
        for(let i of document.querySelector('#statusButton').children){
          if(i.getAttribute('value') == this.state.filterProps.status){
            i.style.borderBottomColor = '#223f80'
            i.style.color = '#223f80'
            this.lastSelectedFilterButton = i
          }else{
            i.style.color = '#6d7593'
            i.style.borderBottomColor = '#6d7593'
          }
        }

      })
      
    }
    searchInput(e){
      if(e.keyCode == 13){
        this.searchCustomer()
      }
    }
    searchCustomer(){
      let txt = this.state.searchValue
      txt = txt.split(' ').join('.*')
      let newCustomerList = this.customerList
      newCustomerList = newCustomerList.filter((element)=>{
      let string = element.name + element.mobile + element.date 
      return string.match(new RegExp(`.*${txt}.*`,"g"))
      })
      this.filterAndSort(newCustomerList)
      // this.displayCustomer(newCustomerList)
    }
    render(){
      
      
        return(
            <div id='contactMain' >
            <div id="statusBar">
                <div id="statusButton">
                  <button class="statusButton" value='0'  onClick={this.setFilterPropStatus}  >ALL</button>
                  <button class="statusButton" value='3'  onClick={this.setFilterPropStatus}  >ACTIVE</button>
                  <button class="statusButton" value='2'  onClick={this.setFilterPropStatus}  >PENDING</button>
                  <button class="statusButton" value='4 '  onClick={this.setFilterPropStatus}  >INACTIVE</button>
                </div>
          
              </div>
          
              <div id="searchBarDiv">
                <div id="searchBar">
                  <img id="icon" src={require("../images/Search.svg")} alt="eye icon"/>
                  <input type="text" name="searchValue"  onChange={this.changeInVal} onKeyDown={this.searchInput} id="searchField" value={this.state.searchValue}  />
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
                  <button class="label" onClick={this.toggleFilterSort} value='2' >Name</button>
                  <p class="label">Mobile</p>
                  <p class="label">Status</p>
                  <button class="label" onClick={this.toggleFilterSort} value='1'  >Added Date</button>
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
                    <button className="fLabel" onClick={this.setFilterPropsTag} value='tag1' >tag1</button>
                    <button className="fLabel" onClick={this.setFilterPropsTag} value='tag2' >tag2</button>
                    <button className="fLabel" onClick={this.setFilterPropsTag} value='tag3' >tag3</button>
                    <button className="fLabel" onClick={this.setFilterPropsTag} value='tag4' >tag4</button>
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