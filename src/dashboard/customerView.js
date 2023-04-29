import React from "react";
import { WithRouter } from "../routingWrapper";
import "../styles/clients.css"
import "../styles/notes.css"
import dateToString from "../dateToString";

import arwDwn from '../images/arwDwn.png'
import dateRange from "../images/Date_range_fill_white.svg"
import Ellipse from "../images/Ellipse.svg"
import profile from "../images/profile.png"
import arrow_left_white from "../images/arrow_left_white.svg"
import three_dots from "../images/three-dots.svg"
import call from "../images/call.svg"
import Message from "../images/Message.svg"
import plus from "../images/plus.svg"
import Trash from "../images/Trash.svg"
import Date_range from "../images/Date_range.svg"
import Time from "../images/Time.svg"
import Edit_fill from "../images/Edit_fill.svg"
import KYCsteps from "./steps";


class CustomerView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            KYCLog: [],
           section:1,
           customer:{
            id:undefined,
            email:"",
            first_name:"",
            last_name:"",
            image:null,
            phone:"",
            pan_number:"",
            aadhar:null,
            gender:undefined,
            gender_name:"",
            address1:null,
            address2:null,
            city:null,
            city_name:null,
            state:null,
            state_name:null,
            pincode:null,
            place_of_birth:null,
            place_of_birth_name:null,
            kyc_completed:false,
            created_at:"",
            date_of_birth:'',
            tasks:[],
            notes:[]
           },
           addTaskMenu:'none',
           completedTaskMenu:'none',
           addNotesPage:"none",
           editCustomerDetail:"none"
        }
        
        this.currentTask = ""
        this.changeSection = this.changeSection.bind(this)
        this.displaySection = this.displaySection.bind(this)
        this.generateTasks = this.generateTasks.bind(this)
        this.filterTasksByType = this.filterTasksByType.bind(this)
        this.toggleAddTaskMenu = this.toggleAddTaskMenu.bind(this)
        this.toggleCompletedTaskMenu = this.toggleCompletedTaskMenu.bind(this)
        this.addTask = this.addTask.bind(this)
        this.emptyAddTaskMenu = this.emptyAddTaskMenu.bind(this)
        this.completeTask = this.completeTask.bind(this)
        this.toggleAddNotesPage = this.toggleAddNotesPage.bind(this)
        this.toggleEditCustomerDetail = this.toggleEditCustomerDetail.bind(this)
        this.updateClientInfo = this.updateClientInfo.bind(this)
        this.changeInDateValue = this.changeInDateValue.bind(this)
    }
    toggleAddTaskMenu(){
        let menu = this.state.addTaskMenu
         
        menu = menu == "none"?"flex":'none'
        this.setState({addTaskMenu:menu})
    }
    addTask(){
         
        let obj = {}
        let menu = document.querySelector('#addTaskDiv')
        obj.title = menu.querySelector('#title').value
        obj.body = menu.querySelector('#desc').value
        let isError = false
        if(obj.title == ""){
            menu.querySelector('#title').style.borderBottomColor = "red"
            isError = true
        }else{
            menu.querySelector('#title').style.borderBottomColor = "#223F80"
        }
        
        if(obj.discription == "") {
            menu.querySelector('#desc').style.borderColor = "red"
            isError = true
        }else{
            menu.querySelector('#desc').style.borderColor ="#B8B8B8"
        }
        if(isError) return
        let date =menu.querySelector("#addTaskDate").value
        let time = menu.querySelector('#addTaskTime').value
        obj.type = 0
        obj.id = Number.parseInt(`${this.state.customer.id}${this.state.customer.tasks.length}`)
         
        let customer = this.state.customer
        customer.tasks.push(obj)
        obj.date = date+"T"+time+"Z"
        obj.customer_id=this.state.customer.id
        obj.broker_id=localStorage.getItem("id")
        obj.outcome = ""
        obj.completed = false
        obj.name = this.state.customer.first_name+" "+this.state.customer.last_name
        console.log(date+"T"+time+"Z")
        fetch("addTask",{
            method:'post',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })


        this.setState({customer:customer},()=>{
            this.generateTasks(this.state.customer.tasks)
        })
        this.toggleAddTaskMenu()
    }
    emptyAddTaskMenu(){
        let menu = document.querySelector('#addTaskDiv')
        menu.querySelector('#title').value = ""
        menu.querySelector('#desc').value = ""
        menu.querySelector("#addTaskDate").value = dateToString(new Date(),2).replace(/ /g,"-")
        menu.querySelector('#addTaskTime').value = "00:00"
    }
    toggleEditCustomerDetail(){
        let editCustomerDetail = this.state.editCustomerDetail;
        editCustomerDetail = editCustomerDetail == "block"?"none":"block";
        this.setState({editCustomerDetail:editCustomerDetail})
    }
    toggleCompletedTaskMenu(e){
        let completedTaskMenu = this.state.completedTaskMenu
        let menu = document.querySelector('#completedTaskScreen')
         
        if(completedTaskMenu != "flex") this.currentTask = e.currentTarget.value

        completedTaskMenu = completedTaskMenu == "none"?"flex":'none'
         
        if(completedTaskMenu == 'flex'){
            let taskObj
            for (let task of this.state.customer.tasks){
                if(task.id == Number.parseInt(this.currentTask)){
                    taskObj = task;
                }
                
            }

            menu.querySelector('#title').value = taskObj.title
            menu.querySelector('#desc').value = taskObj.body
            menu.querySelector("#date").value = dateToString(new Date(taskObj.date),2).replace(/ /g,"-")
            menu.querySelector('#time').value = new Date(taskObj.date).getHours().toString().padStart(2, '0')+":"+new Date(taskObj.date).getMinutes().toString().padStart(2, '0');
            menu.querySelector('#outcome').value = ""
        }
        this.setState({completedTaskMenu:completedTaskMenu})
    }
    completeTask(){
         
        let menu = document.querySelector('#completedTaskDiv')
        let customer = this.state.customer
         
        let outcome = menu.querySelector('#outcome').value
        if (outcome == ""){
            menu.querySelector('#outcome').style.borderColor = "red"
            return
        }else{
            menu.querySelector('#outcome').style.borderColor = "#B8B8B8"
        }
        let currentTask;
        for (let task of this.state.customer.tasks){
            if(task.id == Number.parseInt(this.currentTask)){
                currentTask = task;
            }
            
        }
        
        currentTask.completed = true
        currentTask.outcome = outcome 
        this.setState({customer:customer})
        this.generateTasks(this.state.customer.tasks)
        this.toggleCompletedTaskMenu()
        fetch("/completeTask",{
            method:'post',
            body:JSON.stringify({id :this.currentTask,broker_id:localStorage.getItem("id"),outcome:outcome}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
    }
    filterTasksByType(e){
         
        let type = Number.parseInt(e.currentTarget.value)
        let tasksList = this.state.customer.tasks
        switch(type){
            case 1:
                tasksList  = tasksList.filter((element)=>element.due>0)
                break;
            case 2:
                tasksList  = tasksList.filter((element)=>element.completed)
                break;
        }
        this.generateTasks(tasksList)
    }
    getCustomerDetail(){
        // let url = ""
        // fetch(url)
        // .then(()=>{})
    }
    changeSection(e){
        let obj = {}
        let lastTarget = document.querySelectorAll(".statusButton")[Number.parseInt(this.state.section)-1]
         
        lastTarget.style.color = "#6D7593"
        lastTarget.style.borderBottomColor = "#6D7593"
        obj.section = e.currentTarget.value
        let target = e.currentTarget
        target.style.color = '#223F80'
        target.style.fontWeight = '600'
        target.style.borderBottomColor = '#253564'

        this.setState(obj)
        this.displaySection(e.currentTarget.value)
    }
    displaySection(value){
         
        // let info = document.querySelector('#info')
        // info.style.display = 'none'
        let infoContent = document.querySelector('#infoContent')
        infoContent.style.display = 'none'
        let kycStatus = document.querySelector('#kycStatus')
        kycStatus.style.display = 'none'
        let notesContent = document.querySelector('#notesContent')
        notesContent.style.display = 'none'
        let tasks = document.querySelector('#tasks')
        tasks.style.display = 'none'
        switch(value){
            case '1':
            default:
                infoContent.style.display = 'grid'
                break;
            case '2':
                kycStatus.style.display = 'flex'
                break;
            case '3':
                notesContent.style.display = 'flex'
                break;
            case '4':
                tasks.style.display = 'flex'
                break;
        }
    }
    generateTasks(tasksList){
        console.log(tasksList)
        // tasksList = {...tasksList}
        // <div className="OverdueTaskCard">
        // <div id="portion1">
        //     <p id="title">Overdue</p>
        //     <div id="right">
        //     <p id="date">dd mm yyyy</p>
        //     <p id="time">--:--</p>
        //     </div>
        // </div>
        // <p id="portion2">Description daff pdfplf pdfpodmf dpofjdof dfodf oppadfm dpfof o[ffdf gf0j fogin fpsogn apsdfgion a[dfgpj</p>
        // <div id="portion3">
        //     <button>
        //     <img src={require("../images/Ellipse.svg")} alt="checkbox"/>
        //     </button>
        // </div>
        // </div>
        let taskType;   
        tasksList = tasksList.sort((a,b)=>{return new Date(b.date).getTime()-new Date(a.date).getTime()})
        let taskCardSpace = document.querySelector('#taskCardSpace')
        taskCardSpace.innerHTML = ""
        if(tasksList.length == 0){
            taskCardSpace.innerText = "no tasks added"
            return
        }
        for(let task of tasksList){
            console.log(new Date(task.date))
            console.log(task)
            if(task.completed){
                taskType = 'CompletedTaskCard'
            }else if(task.due > 0){
                taskType = 'OverdueTaskCard'
            }else{
                taskType = 'taskCard'
            }
             
            let taskCard = document.createElement('div')
            taskCard.className = taskType
            
            let portion1 = document.createElement('div')
            portion1.id = 'portion1'
            let portion2 = document.createElement('p')
            portion2.id = 'portion2'
            let portion3 = document.createElement('div')
            portion3.id = 'portion3'
            
            let title = document.createElement('p')
            title.id='title'

            let right = document.createElement('div')
            right.id = "right"
            let date = document.createElement('p')
            date.id = "date"
            let time = document.createElement('p')
            time.id = "time"
            right.appendChild(date)
            right.appendChild(time)
            portion1.appendChild(title)
            portion1.appendChild(right)
            
            let img = document.createElement('img')
            img.src = Ellipse
            img.alt = "checkbox"
            
            let button1 = document.createElement("button")
            button1.value = task.id
            button1.onclick = this.toggleCompletedTaskMenu
            button1.appendChild(img)

            portion3.appendChild(button1)
            let taskDate = new Date(task.date)
            title.innerText = task.title
            date.innerText = dateToString(taskDate,1)
            time.innerText =new Date(taskDate).getHours().toString().padStart(2, '0')+":"+new Date(taskDate).getMinutes().toString().padStart(2, '0')
            portion2.innerText = task.body

            taskCard.appendChild(portion1)
            taskCard.appendChild(portion2)
            taskCard.appendChild(portion3)
            taskCardSpace.appendChild(taskCard)
        }
    }
    toggleAddNotesPage(){
        let notesPg = this.state.addNotesPage
        
        if(notesPg == "none"){
            notesPg = "flex"
        }else{
            notesPg = "none"
            let noteTitle = document.querySelector("#noteTitle")
            let noteBody = document.querySelector("#noteBody")
            if (noteTitle.value != "" && noteBody.value != ""){
                let customer = this.state.customer;
                let data = {
                    id:Number.parseInt(`${this.state.customer.id}${customer.notes.length}`),
                    customer_id:customer.id,
                    broker_id:localStorage.getItem("id"),
                    title:noteTitle.value,
                    body:noteBody.value,
                    date: dateToString(new Date()).replace(/ /g,"-")}      
                customer.notes.push(data)
                this.setState({customer:customer})
                this.generateNotes(this.state.customer.notes)
                
                fetch("addNote",{
                    method:'post',
                    body:JSON.stringify(data),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    }
                })
                noteTitle.value = ""
                noteBody.value = ""


            }
        }
        this.setState({addNotesPage:notesPg})
    }
    generateNotes(noteList){
        console.log(noteList)
        let notesContainer = [document.querySelector("#left"),document.querySelector("#right")]
        notesContainer[0].innerHTML = ""
        notesContainer[1].innerHTML = ""
        let i = 0;
        // <div className="note">
        //     <p id="title">HTML</p>
        //     <p id="content">
        //         Areyyyyyy fgkn fkgn k;mnfg adlg;mn adfg;lmnm fgkn dfjbg jabf io;;ad fhiodf p difhpd dp fihdf  phdfih dp’ a’hf hidh gkl fg ugh ; fgjh gl;  hgfi f fgf ldfgdifgeiu ildfgdufg agdfidgfid digfidfgi dlahifgidfg aldhgfidgf lidgidfdgfgds fgjob; hadf;ho adgo;h ag;oh iahgpihgigh iadugfu iughih fihf h9difyh 
        //     </p>
        // </div>
        let noteCard,title,body
        // console.log(noteList)
        if(noteList.length == 0){
            
            notesContainer[0].innerText = "notes not added"
            return
        }
        for(let note of noteList){
            noteCard = document.createElement('div')
            noteCard.className = "note"
            title = document.createElement("p")
            title.id = "title"
            title.innerText = note.title
            body = document.createElement("p")
            body.id="content"
            body.innerText = note.body
            noteCard.appendChild(title)
            noteCard.appendChild(body)

            notesContainer[(i%2)].appendChild(noteCard)
            i++
        }
    }
    updateClientInfo(){
        let personalInfo = document.querySelector("#personalInfo")
        let obj = {}
        console.log(personalInfo.querySelectorAll(".inputField"))
        for(let field of personalInfo.querySelectorAll(".inputField")){
            console.log(field)
            obj[field.name] = field.value
        }
        console.log(obj)
        fetch(`http://dev.api.vittae.money/broker/customer-onboarding/${this.state.customer.id}/`,{
        method:'PATCH',
        body:JSON.stringify(obj),
        headers: {
            "Authorization":`Passcode ${localStorage.getItem("token")}`,
            "Content-type": "application/json; charset=UTF-8",
            'Connection':"keep-alive"}
        })
    }
    changeInDateValue(e){
        let customer = this.state.customer
        customer[e.currentTarget.name] = e.currentTarget.value
        this.setState({customer:customer})
    }
    componentDidMount(){

        let obj = this.props.getItem("currentCustomerView")
        if (!obj) {
            obj = {}
            obj.id = localStorage.getItem("currentCustomerViewId")
        }
        console.log(localStorage.getItem("token"))
        try{
        fetch(`http://dev.api.vittae.money/broker/customer-detail/${obj.id}/`,{
            method:'GET',
            headers: {
              "Authorization":`Passcode ${localStorage.getItem("token")}`,
            "Content-type": "application/json; charset=UTF-8",
            'Connection':"keep-alive"}
          })
          .then(response=>{return response.json()})
          .then(async data=>{

            //getting notes tasks
            data.notes = await fetch("getNotesList",{
                method:'POST',
                body:JSON.stringify({customer_id:obj.id,broker_id:localStorage.getItem("id")}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => {

              if (response.status != 200) throw new Error('Something went wrong')
              return response.json()
            })
            
            //getting taks list
            data.tasks = await fetch("getTasksList",{
                method:'POST',
                body:JSON.stringify({customer_id:obj.id,broker_id:localStorage.getItem("id")}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => {

              if (response.status != 200) throw new Error('Something went wrong')
              return response.json()
            })
            //getting kyc log
            // see id => 391
            let KYCLog = []
            //  = [] await fetch(`http://dev.api.vittae.money/broker/customer-kyc-log/${obj.id}/`,{
            //     method:'GET',
            //     headers: {
            //         "Authorization":`Passcode ${localStorage.token}`,
            //         "Content-type": "application/json; charset=UTF-8",
            //         'Connection':"keep-alive"
            //     }
            // }).then((response) => {

            //   if (response.status != 200) throw new Error('Something went wrong')
            //   return response.json()
            // })
            

            this.setState({customer:data,KYCLog:KYCLog},()=>{
                this.generateNotes(this.state.customer.notes)
                this.generateTasks(this.state.customer.tasks)
                this.displaySection("1");
            })
            
          })
        }
        catch(err){
            console.error(err)
            }
    }
    render(){
        console.log(this.state)
        console.log(new Date().getFullYear(),new Date(this.state.customer.date_of_birth).getFullYear())
        return(
            <section id="Client">
                <nav className="navbar">
                    <button className="profile" onClick={this.props.navigate} value="../profile">
                    <p id="profileName">{`${localStorage.getItem("first_name")[0].toUpperCase()}${localStorage.getItem("last_name")[0].toUpperCase()}`}</p>
                    </button>

                    <div className="icons">
                    <button className="icon">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
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

                <div id="personalInfo" style={{"display":this.state.editCustomerDetail}}>
                    <div id="backButtonDiv"  onClick={this.toggleEditCustomerDetail}>
                        <button id="backButton">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.1665 12.5L3.4594 11.7929L2.75229 12.5L3.4594 13.2071L4.1665 12.5ZM19.7915 13.5C20.3438 13.5 20.7915 13.0523 20.7915 12.5C20.7915 11.9477 20.3438 11.5 19.7915 11.5V13.5ZM9.7094 5.54289L3.4594 11.7929L4.87361 13.2071L11.1236 6.95711L9.7094 5.54289ZM3.4594 13.2071L9.7094 19.4571L11.1236 18.0429L4.87361 11.7929L3.4594 13.2071ZM4.1665 13.5H19.7915V11.5H4.1665V13.5Z"
                                fill="black" fill-opacity="0.79" />
                            </svg>
                        </button>
                    </div>
                
                    <div class="profileDiv">
                        <p>Personal Info</p>
                    </div>
                
                    <div class="inputField">
                        <p class="label">First name</p>
                        <input class="field inputField" type="text" name="first_name" defaultValue={this.state.customer.first_name} />

                        <p class="label">Last name</p>
                        <input class="field inputField" type="text" name="last_name" defaultValue={this.state.customer.last_name} />
                    

                        <p className="label">Gender</p>
                        <div className="dropDownDiv field">
                            <select id="newCusGender" className="inputField"  name="gender" defaultValue={this.state.customer.gender} >
                            <option value="" disabled >Select your option</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Other</option>
                            </select>
                            <img src={arwDwn} alt=""/>
                        </div>
                        
                        <p className="label">Occupation</p>
                        <input id="newCusDOB"  type="text" className="field inputField"  name='occupation' />
                        

                        <p className="label">Date of Birth</p>
                        <div id="dobField" >
                            <input id="newCusDOB"  type="date" className="inputField field" name='date_of_birth' value={dateToString(new Date(this.state.customer.date_of_birth),2).replace(/ /g,"-")} onChange={this.changeInDateValue} />
                        </div>
                    </div>

                    <div class="profileDiv">
                            <p>Contact Info</p>
                    </div>

                    <div class="inputField">
                        <p class="label">Mobile number</p>
                        <input class="field inputField" name="phone" type="text" defaultValue={this.state.customer.phone} />
                        
                        <p class="label">Email ID</p>
                        <input class="field inputField" name="email" type="text" defaultValue={this.state.customer.email} />
                        
                        {/* <p class="label">Place of birth</p>
                        <input class="field inputField" type="text"/>
                    
                        <p class="label">Account name</p>
                        <input class="field inputField" type="text"/>
                    
                        <p class="label">Account number</p>
                        <input class="field inputField" type="number"/>
                    
                        <p class="label">IFSC Code</p>
                        <input class="field inputField" type="text"/> */}
                    
                        <button id="saveButton" onClick={this.updateClientInfo}>
                            save
                        </button>
                    </div>
                </div>

                <div id="main">
                    <div id="info">
                    <div id="portion1">
                        <div id="portion1Left">
                        <img src={arrow_left_white} alt="left arrow" onClick={this.props.navigate} value='../dashboard'  />
                        <div id="deets">
                            <div id="edit">
                            <p id="name">{this.state.customer.first_name?(this.state.customer.first_name.length<=10?this.state.customer.first_name:`${this.state.customer.first_name.slice(0,7)}...`):""}</p>
                            <button  onClick={this.toggleEditCustomerDetail} >
                                <img src={Edit_fill} alt="edit"/>
                            </button>
                            </div>
                            
                            <p id="designation">{this.state.customer.designation}</p>
                            <div id="statusDiv">
                            <p id="statusDot">.</p>
                            <p id="statusTxt">{this.state.customer.status}</p>
                            </div>
                        </div>
                        </div>
                        
                        <div id="portion1Right">
                        <div id="dateBox">
                            <p id="dateTxt">Added {new Date(this.state.customer.created_at).toDateString()}</p>
                        </div>
                        <button id="edit">
                            Edit
                        </button>
                        </div>
                    </div>

                    <div id="portion2">
                        <a href={'tel:'+this.state.customer.phone} className="contact">
                        <img src={call} alt="mobile"/>
                        Call
                        </a>

                        <a href={'mail:'+this.state.customer.email} className="contact">
                        <img src={Message} alt="mail"/>
                        Mail
                        </a>
                    </div>
                    </div>
                    <div id="statusBar">
                    <div id="statusButton">
                        <button className="statusButton" value='1' onClick={this.changeSection}  >INFO</button>
                        <button className="statusButton" value='2' onClick={this.changeSection} >KYC STATUS</button>
                        <button className="statusButton" value='3' onClick={this.changeSection} >NOTES</button>
                        <button className="statusButton" value='4' onClick={this.changeSection} >TASKS</button>
                    </div>
                    </div>

                    <div id="infoContent">
                    <p className="infoLabel">Personal info</p>
                    <div className="infolDiv">
                        <div className="grid-container">
                        <div className="grid-item">Name</div>
                        <div className="grid-item info">{this.state.customer.first_name+' '+this.state.customer.last_name}</div>
                        <div className="grid-item">Date of birth</div>  
                        <div className="grid-item info">{dateToString(new Date(this.state.customer.date_of_birth)).replace(/ /g,"-")}</div>
                        <div className="grid-item">Age</div>
                        <div className="grid-item info">{new Date().getFullYear() - new Date(this.state.customer.date_of_birth).getFullYear() }</div>    
                        <div className="grid-item">Gender</div>
                        <div className="grid-item info">{this.state.customer.gender_name}</div>
                        {/* <div className="grid-item">Marital status of the person</div>
                        <div className="grid-item emptyInfo">-</div> */}  
                        </div> 
                    </div>

                    <p className="infoLabel">Contact info</p>
                    <div className="infoDiv">
                        <div className="grid-container">
                        <div className="grid-item">Mobile number</div>
                        <div className="grid-item info">{this.state.customer.phone}</div>
                        <div className="grid-item">Email id</div>  
                        <div className="grid-item info">{this.state.customer.email}</div>   
                        </div>
                    </div>

                    <p className="infoLabel">Document details</p>
                    <div className="infoDiv">
                        <div className="grid-container">
                        <div className="grid-item">pan number</div>
                        <div className="grid-item emptyInfo">{this.state.customer.pan_number?"##########":"---"}</div>
                        <div className="grid-item">Adhaar number</div>  
                        <div className="grid-item info">{this.state.customer.pan_number?"#### #### ####":"---"}</div>  
                        </div>
                    </div>

                    {/* <p className="infoLabel">Document details</p>
                    <div className="infoDiv">
                        <div className="grid-container">
                        <div className="grid-item">Account name</div>
                        <div className="grid-item info">Deekay</div>
                        <div className="grid-item">Bank name</div>  
                        <div className="grid-item info">####</div>
                        <div className="grid-item">Account number</div>  
                        <div className="grid-item info">##########</div>  
                        <div className="grid-item">IFSC Code</div>  
                        <div className="grid-item info">#######</div>  
                        </div>
                    </div> */}
                    </div>

                    <div id='kycStatus'>
                    {this.state.KYCLog.length > 0 && <KYCsteps items={this.state.KYCLog}/>}
                    </div>

                    <div id="notesContent">
                    <button id="add" onClick={this.toggleAddNotesPage}>
                        <img src={plus} alt="add customer button"/>
                    </button>
                    <div id="left"></div>
                    <div id="right"></div>
                    </div>

                    <div id="tasks">
                        <div id="dropDown">
                            <select className="select" onChange={this.filterTasksByType} >
                            <option value="0" selected>all</option>
                            <option value="1">Overdue</option>
                            <option value="2">Completed</option>
                            </select>
                        </div>
                        <div id="taskCardSpace">
                            
                        </div>
                    <button id="add" onClick={this.toggleAddTaskMenu} >
                        <img src={plus} alt="add customer button"/>
                    </button>
                    </div>

                    <div id="addTaskScreen" style={{'display':this.state.addTaskMenu,'zIndex':2,'position':'absolute '}} >
                        <div id="addTaskDiv">
                            <div id="portion1">
                            <button id="closeIcon" onClick={this.toggleAddTaskMenu} >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" fill="#7B86A7" fillOpacity="0.25" />
                                <path d="M16 8L8 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 8L16 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button id="delete" onClick={this.emptyAddTaskMenu}>
                                <img src={Trash} alt="delete"/>
                            </button>
                            </div>
                            <div id="portion2">
                            <input id="title" type="text" placeholder="Add title" maxlength="100"/>
                            <textarea name="" id="desc" placeholder="Description" maxlength="2500"></textarea>
                            <div id="fieldDiv">
                                <div className="field">
                                <img src={Date_range} alt="date"/>
                                <input type="date" id='addTaskDate' defaultValue={dateToString(new Date(),2).replace(/ /g,"-")} />
                                </div>
                                <div className="field">
                                <img src={Time} alt="time"/>
                                <input type="time" id='addTaskTime' defaultValue="00:00"  />
                                </div>
                            </div>
                            </div>
                            <button id="save" onClick={this.addTask} >
                            Save
                            </button>
                        </div>
                        </div>    
                    <div id="completedTaskScreen" style={{'display':this.state.completedTaskMenu,'zIndex':2,'position':'absolute '}} >
                        <div id="completedTaskDiv">
                            <div id="portion1">
                            <button id="closeIcon" onClick={this.toggleCompletedTaskMenu}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" fill="#7B86A7" fillOpacity="0.25" />
                                <path d="M16 8L8 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 8L16 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button id="delete">
                                <img src={Trash} alt="delete"/>
                            </button>
                            </div>
                            <div id="portion2">
                            <input id="title" type="text" placeholder="Add title" disabled />
                            <textarea name="" id="desc" placeholder="Description" disabled ></textarea>
                            <div id="fieldDiv">
                                <div className="field">
                                <img src={Date_range} alt="date"/>
                                <input type="date" id="date" disabled/>
                                </div>
                                <div className="field">
                                <img src={Time} alt="time"/>
                                <input type="time" id="time"disabled/>
                                </div>
                                <p>Outcome<a>*</a></p>
                            </div>
                            <textarea id="outcome" maxlength="2500"></textarea>
                            </div>
                            <button id="save" onClick={this.completeTask} >
                            Save
                            </button>
                        </div>
                        </div>
                    <div id="notesPg" style={{'display':this.state.addNotesPage}}>
                        <div id="backButton">
                            <button onClick={this.toggleAddNotesPage}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M4.1665 12.5L3.4594 11.7929L2.75229 12.5L3.4594 13.2071L4.1665 12.5ZM19.7915 13.5C20.3438 13.5 20.7915 13.0523 20.7915 12.5C20.7915 11.9477 20.3438 11.5 19.7915 11.5V13.5ZM9.7094 5.54289L3.4594 11.7929L4.87361 13.2071L11.1236 6.95711L9.7094 5.54289ZM3.4594 13.2071L9.7094 19.4571L11.1236 18.0429L4.87361 11.7929L3.4594 13.2071ZM4.1665 13.5H19.7915V11.5H4.1665V13.5Z"
                                fill="black" fillOpacity="0.79" />
                            </svg>
                            </button>
                        </div>
                        <input id="noteTitle" type="title" placeholder="Title"/>
                        <textarea id="noteBody" name="notes" placeholder="Type your note" cols="30" rows="10"></textarea>
                    </div>
                </div>
                </section>
        )
    }
}

export default WithRouter(CustomerView)