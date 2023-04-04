import React from "react";
import Search from '../images/Search.svg'
import plus from '../images/plus.png'
import arwDwn from '../images/arwDwn.png'
import dateToString from "../dateToString"
import { WithRouter } from "../routingWrapper";
import CustomerListCard from "./customerListCard";
import { ReactDOM } from "react";
class Customer {
  constructor(){
    this.id = 0
    this.name= ''
    this.mobile=''
    this.status=0//1,2,3 or 4
    this.date=new Date().toDateString()//date obj
    this.dateOfBirth=""//date obj (NOT used in list)
    this.tag=['']//tag1,tag2,etc
    this.designation = ""//ANY TEXT (NOT used in list)
    this.gender=""//Male,female or others (NOT used in list)
    this.mail = "" // (NOT used in list)
    this.maritalStatus = ""//Single, Married, Widowed or Divorced (NOT used in list)
  }
}
class ContactsComp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          customerCompList:[]
        }
        this.customerList = []      
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
        this.displayCustomer = this.displayCustomer.bind(this)
        this.displayMessage = this.displayMessage.bind(this)
        this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
        this.toggleAddClientMenu = this.toggleAddClientMenu.bind(this)
        
        this.submit = this.submit.bind(this)
        this.openCustomerView = this.openCustomerView.bind(this)
        this.setFilterPropStatus = this.setFilterPropStatus.bind(this)
        this.filterAndSort = this.filterAndSort.bind(this)
        this.toggleFilterSort = this.toggleFilterSort.bind(this)
       
        this.searchCustomer = this.searchCustomer.bind(this)
        this.setFilterPropsTag = this.setFilterPropsTag.bind(this)
        this.updateIndexState = this.updateIndexState.bind(this)
        this.scrollingList = this.scrollingList.bind(this)
        this.fetchCustomersList = this.fetchCustomersList.bind(this)
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
    displayCustomer(customerList){
        let container = document.body.querySelector('#cardsList')

        // container.innerHTML = ''
        let statusBackgroundColor
        let customerCompList = this.state.customerCompList 

        

        customerList.map(i=>{
            if(i.is_purchased){
              i.status = 3//active
            }else if(i.is_kyc_completed){
              i.status = 4//inactive
            }else if(i.is_kyc_processing){
              i.status = 2//processing
            }else{
              i.status = 1//started
            }
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
            
            customerCompList.push(<CustomerListCard
              key={i.id}
              id={i.id}
              color={statusBackgroundColor} 
              name={i.first_name + " " + i.last_name} 
              phone={i.phone} 
              createdat={i.created_at}
              setItem={this.props.setItem}
              />)
            
            // cards.value = i.id
            // cards.onclick = this.openCustomerView
            // 
        })
        
    }
    openCustomerView(e){ 
      let target = e.currentTarget.value
      
      for (let i of this.customerList){
        if(i.id == target){
          this.props.setItem({contactCompState:this.state,currentCustomerView : i},()=>{
            this.props.navigate('../customerview')
          })
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
        newCustomerList = newCustomerList.filter((element)=>{return element.kyc_type == Number.parseInt(filterProps.status)})
      }
      
      
      switch (filterProps.sort) {
        default:
        case 'dateDesc':
          newCustomerList = newCustomerList.sort((a,b)=>{return new Date(b.created_at).getTime()-new Date(a.created_at).getTime()})
          break;
        case 'dateAsce':
          newCustomerList = newCustomerList.sort((a,b)=>{return new Date(a.created_at).getTime()-new Date(b.created_at).getTime()})
          break;
        case 'nameDesc':
          newCustomerList = newCustomerList.sort((a,b)=>{return (b.fist_name+" "+b.last_name).localeCompare((a.fist_name+" "+a.last_name))})
          break;
        case 'nameAsce':
          newCustomerList = newCustomerList.sort((a,b)=>{return (a.fist_name+" "+a.last_name).localeCompare((b.fist_name+" "+b.last_name))})
          break;  
      }
      //filter by tag
      
      
      let string 
      newCustomerList = newCustomerList.filter((element)=>{
        
        string = element.tag == null?"":element.tag.join(' ');
        let bool = true,newBool = false
        this.state.filterProps.tag.map((element)=> {
          newBool = new RegExp(element).test(string)
          bool = bool && newBool
        })
        // 
        return bool
      })
      // console.dir(newCustomerList)
      // document.body.querySelector('#cardsList').innerHTML = ""
      this.setState({customerCompList:[]},()=>{
        this.displayCustomer(newCustomerList)
      })
    }
    async submit(){
      let form = document.querySelector("#addCustomer")
      let arr = []
      let obj = {}

      arr.push(...form.querySelectorAll("input"))
      arr.push(...form.querySelectorAll("select"))
      for(let element of arr){
        obj[element.name] = element.value
      }

      // return
      // obj.date = new Date().toDateString()
      // obj.status = "1"
      // obj.id = Number.parseInt(this.customerList.length)+1
      // obj.tag = []
      fetch("http://dev.api.vittae.money/broker/customer-onboarding/",{
        method:'POST',
        body:JSON.stringify(obj),
        headers: {
        "Authorization":"Passcode bcb4d6b0b3492cac6ec2c7638f1f842ed60feae4",
        "Content-type": "application/json; charset=UTF-8",
        'Connection':"keep-alive"}
      }).then(response=>{response.json()})
      
      //getting a new customer List
      fetch(this.dataUrl,{
        method:'GET',
        headers: {
        "Authorization":"Passcode bcb4d6b0b3492cac6ec2c7638f1f842ed60feae4",
        "Content-type": "application/json; charset=UTF-8",
        'Connection':"keep-alive"}
      })
      .then((response)=>{

        return response.json()})
      .then((data)=>{

        this.props.setItem({customerList:data})
        this.customerList.push(obj)
        this.filterAndSort(this.customerList)
        this.toggleAddClientMenu()
      })

    }
    searchInput(e){
      if(e.keyCode == 13){
        this.searchCustomer()
      }
    }
    searchCustomer(e){
      let obj = {};
      let value = e.currentTarget.value
      obj[e.currentTarget.name] =  value.replace(/ +/g," ")
      if (value.length >= 2) obj.customerCompList= []
      obj.current_page = 1
      this.setState(obj,()=>{
        // document.body.querySelector('#cardsList').innerHTML = ""
        this.fetchCustomersList()
      })
        
    }
    scrollingList(e){
      let target = e.currentTarget
      let scrollValue = target.scrollTop
      let maxScrollableHeight = target.scrollHeight-target.clientHeight


      let current_page = this.state.current_page
      if(scrollValue === maxScrollableHeight && current_page < this.state.num_pages){
        current_page+=1
        this.setState({current_page:current_page},()=>{
          this.props.setItem({contactCompState:this.state})
          this.fetchCustomersList()
        })
      }
    }
    async fetchCustomersList(){
      let page = this.state.current_page
      let search = this.state.searchValue
      let dataUrl = `http://dev.api.vittae.money/broker/customer-list/?page=${page}&page_size=10`

      if (search) 
        if(search.length>=3){
          dataUrl += `&search=${search}`
          this.setState({customerCompList:[]})
        }
      let data = await fetch(dataUrl,{
        method:'GET',
        headers: {
          "Authorization":"Passcode bcb4d6b0b3492cac6ec2c7638f1f842ed60feae4",
        "Content-type": "application/json; charset=UTF-8",
        'Connection':"keep-alive"}
      })
      .then((response)=>{

        return response.json()})
      this.customerList.push(...data.data)
      this.displayCustomer(data.data)

      delete data.data
      this.setState(data,()=>{
        this.props.setItem({customerList:[...this.customerList],contactCompState:this.state})
      })
    }
    componentDidMount(){
      let obj = this.props.getItem('contactCompState')


      this.customerList = this.props.getItem('customerList')
      
      this.setState(obj,()=>{

        if (this.customerList.length == 0) this.fetchCustomersList()
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
    render(){
      
      
        return(
            <div id='contactMain'>
            <div id="statusBar">
                <div id="statusButton">
                  <button className="statusButton" value='0'  onClick={this.setFilterPropStatus}  >ALL</button>
                  <button className="statusButton" value='3'  onClick={this.setFilterPropStatus}  >ACTIVE</button>
                  <button className="statusButton" value='2'  onClick={this.setFilterPropStatus}  >PENDING</button>
                  <button className="statusButton" value='4 '  onClick={this.setFilterPropStatus}  >INACTIVE</button>
                </div>
            
              </div>
          
              <div id="searchBarDiv">
                <div id="searchBar">
                  <img id="icon" src={Search} alt="eye icon"/>
                  <input type="text" name="searchValue"  onChange={this.searchCustomer} id="searchField" value={this.state.searchValue}  />
                </div>
          
                <button onClick={this.toggleFilterMenu} style={{"display":"none"}}  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L5 4" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <path d="M19 20L19 18" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <path d="M5 20L5 16" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <path d="M19 12L19 4" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 7L12 4" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 20L12 12" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="5" cy="14" r="2" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="9" r="2" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="19" cy="15" r="2" stroke="#6D7593" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
          
          
              <div id="labelBar">
          
                <div id="labels">
                  <button className="label" onClick={this.toggleFilterSort} value='2' >Name</button>
                  <p className="label">Mobile</p>
                  <p className="label">Status</p>
                  <button className="label" onClick={this.toggleFilterSort} value='1'  >Added Date</button>
                </div>
          
              </div>
          
              <div className="scrolling-wrapperY" id="cardsList" onScroll={this.scrollingList}>
                {/* list of customers HERE  */}
                {this.state.customerCompList.map(element=>{return element})}
              </div>

              <div id="addCustomer" style={{'display':`${this.state.addClientMenu}`}}  >
              <div id="addBox">
                <button id="closeIcon" onClick={this.toggleAddClientMenu}  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" fill="#7B86A7" fillOpacity="0.25" />
                    <path d="M16 8L8 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 8L16 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
          
                <div className="inputFields">
                  <p className="label">First name</p>
                  <input id="newCusName" required className="field" type="text" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='first_name' />

                  <p className="label">Last name</p>
                  <input id="newCusName" required className="field" type="text" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='last_name' />
          

                  <p className="label">Designation</p>
                  <input id="newCusDesi"  className="field" type="text" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='occupation'/>
            
                  <p className="label">Mobile number</p>
                  <input id="newCusMobile"  className="field" type="number" onChange={this.changeInVal} onKeyDown={this.changeInVal} name='phone'   />
          
                  <p className="label">Email ID</p>
                  <input id="newCusMail" className="field" type="email"  onChange={this.changeInVal} onKeyDown={this.changeInVal} name='email' />
          
                  <p className="label">Gender</p>
                  <div className="dropDownDiv field">
                    <select id="newCusGender"  name="gender" onChange={this.changeInVal} defaultValue="" >
                      <option value="" disabled >Select your option</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Other</option>
                    </select>
                    <img src={arwDwn} alt=""/>
                  </div>
          
                  <p className="label">Date of Birth</p>
                  <div id="dobField">
                    <input id="newCusDOB"  type="date" className="field" onChange={this.changeInVal} name='date_of_birth'  />
                  </div>
          
                  <p className="label">Marital status</p>
                  <div className="dropDownDiv field"   >
                    <select id="newCusMaritalStatus"  className="select" name="marital_status" onChange={this.changeInVal} defaultValue=""  >
                      <option value="" disabled >Select your option</option>
                      <option value="1">Single</option>
                      <option value="2">Married</option>
                    </select>
                    <img src={arwDwn} alt="arrowDown" />
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
                        <circle cx="12" cy="12" r="9" fill="#7B86A7" fillOpacity="0.25" />
                        <path d="M16 8L8 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 8L16 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
              <button id="add" onClick={this.toggleAddClientMenu} > <img src={plus} alt="add customer button"/></button>
            </div>
        )
    }
}
export default WithRouter(ContactsComp)