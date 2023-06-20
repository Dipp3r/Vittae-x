import React from "react";
import { WithRouter } from "@components/routingWrapper";
import "@assets/styles/clients.scss"
import "@assets/styles/notes.scss"
import dateToString from "@utils/dateToString";

import arwDwn from '@assets/images/arwDwn.png'
// import dateRange from "@assets/images/Date_range_fill_white.svg"
import Ellipse from "@assets/images/Ellipse.svg"
// import profile from "@assets/images/profile.png"
import arrow_left_white from "@assets/images/arrow_left_white.svg"
// import three_dots from "@assets/images/three-dots.svg"
import call from "@assets/images/call.svg"
import Message from "@assets/images/Message.svg"
import plus from "@assets/images/plus.svg"
import Trash from "@assets/images/Trash.svg"
import Date_range from "@assets/images/Date_range.svg"
import Time from "@assets/images/Time.svg"
import Edit_fill from "@assets/images/Edit_fill.svg"
import KYCsteps from "./steps";

import HelpLineIcon from '@components/helpLineIcon';
import NotificationIcon from "@components/notificationIcon";

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
            occupation:"",
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
         
        menu = menu === "none"?"flex":'none'
        this.setState({addTaskMenu:menu})
    }
    addTask(){
         
        let obj = {}
        let menu = document.querySelector('#addTaskDiv')
        obj.title = menu.querySelector('#title').value
        obj.body = menu.querySelector('#desc').value
        let isError = false
        if(obj.title === ""){
            menu.querySelector('#title').style.borderBottomColor = "red"
            isError = true
        }else{
            menu.querySelector('#title').style.borderBottomColor = "#223F80"
        }
        
        if(obj.discription === "") {
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
        
        obj.date = date+"T"+time+"Z"
        obj.customer_id=this.state.customer.id
        obj.broker_id=localStorage.getItem("id")
        obj.outcome = ""
        obj.completed = false
        obj.name = this.state.customer.first_name+" "+this.state.customer.last_name
        console.log(date+"T"+time+"Z")
        fetch(import.meta.env.VITE_SECONDARY_SERVER_URL+"/addTask",{
            method:'post',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        obj.date = new Date(date+"T"+time)
        customer.tasks.push(obj)

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
        editCustomerDetail = editCustomerDetail === "block"?"none":"block";
        this.setState({editCustomerDetail:editCustomerDetail})
    }
    toggleCompletedTaskMenu(e){
        let completedTaskMenu = this.state.completedTaskMenu
        let menu = document.querySelector('#completedTaskScreen')
         
        if(completedTaskMenu !== "flex") this.currentTask = e.currentTarget.value

        completedTaskMenu = completedTaskMenu === "none"?"flex":'none'
         
        if(completedTaskMenu === 'flex'){
            let taskObj
            for (let task of this.state.customer.tasks){
                if(task.id === Number.parseInt(this.currentTask)){
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
        if (outcome === ""){
            menu.querySelector('#outcome').style.borderColor = "red"
            return
        }else{
            menu.querySelector('#outcome').style.borderColor = "#B8B8B8"
        }
        let currentTask;
        for (let task of this.state.customer.tasks){
            if(task.id === Number.parseInt(this.currentTask)){
                currentTask = task;
            }
            
        }
        
        currentTask.completed = true
        currentTask.outcome = outcome 
        this.setState({customer:customer})
        this.generateTasks(this.state.customer.tasks)
        this.toggleCompletedTaskMenu()
        fetch(import.meta.env.VITE_SECONDARY_SERVER_URL+"/completeTask",{
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
            case 0:
            default:
                tasksList = this.state.customer.tasks
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
        //     <img src={require("@assets/images/Ellipse.svg")} alt="checkbox"/>
        //     </button>
        // </div>
        // </div>
        let taskType;   
        tasksList = tasksList.sort((a,b)=>{return new Date(b.date).getTime()-new Date(a.date).getTime()})
        let taskCardSpace = document.querySelector('#taskCardSpace')
        taskCardSpace.innerHTML = ""
        if(tasksList.length === 0){
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
        
        if(notesPg === "none"){
            notesPg = "flex"
        }else{
            notesPg = "none"
            let noteTitle = document.querySelector("#noteTitle")
            let noteBody = document.querySelector("#noteBody")
            if (noteTitle.value !== "" && noteBody.value !== ""){
                let customer = this.state.customer;
                let data = {
                    id:Number.parseInt(`${this.state.customer.id}${customer.notes.length}`),
                    customer_id:customer.id,
                    broker_id:localStorage.getItem("id"),
                    title:noteTitle.value,
                    body:noteBody.value,
                    date: new Date().toISOString()}      
                customer.notes.push(data)
                this.setState({customer:customer})
                this.generateNotes(this.state.customer.notes)
                
                fetch(import.meta.env.VITE_SECONDARY_SERVER_URL+"/addNote",{
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
        if(noteList.length === 0){
            
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
        fetch(import.meta.env.VITE_BASE_SERVER_URL+`/customer-onboarding/${this.state.customer.id}/`,{
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
        fetch(import.meta.env.VITE_BASE_SERVER_URL+`/customer-detail/${obj.id}/`,{
            method:'GET',
            headers: {
              "Authorization":`Passcode ${localStorage.getItem("token")}`,
            "Content-type": "application/json; charset=UTF-8",
            'Connection':"keep-alive"}
          })
          .then(response=>{return response.json()})
          .then(async data=>{
            if(!data.is_vittae_app_user){
                data.statusText = "Didn't install vittae app"
                data.statusBackgroundColor = '#C4C4C4'
              }else if (!(data.is_kyc_processing||data.is_kyc_completed)){
                data.statusText = "Didn't start KYC"
                data.statusBackgroundColor = '#DA6B6B'
              }else if (data.is_kyc_processing){
                data.statusText = "KYC in process"
                data.statusBackgroundColor = '#DAC16B'
              }else if(data.is_kyc_completed){
                data.statusText = "KYC done"
                data.statusBackgroundColor = '#6BDA7D'
              }
            //getting notes tasks
            data.notes = await fetch(import.meta.env.VITE_SECONDARY_SERVER_URL+"/getNotesList",{
                method:'POST',
                body:JSON.stringify({customer_id:obj.id,broker_id:localStorage.getItem("id")}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => {

              if (response.status !== 200) throw new Error('Something went wrong')
              return response.json()
            })
            
            //getting taks list
            data.tasks = await fetch(import.meta.env.VITE_SECONDARY_SERVER_URL+"/getTasksList",{
                method:'POST',
                body:JSON.stringify({customer_id:obj.id,broker_id:localStorage.getItem("id")}),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => {

              if (response.status !== 200) throw new Error('Something went wrong')
              return response.json()
            })
            //getting kyc log
            // see id => 391
            let KYCLog = []
            
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
                    <HelpLineIcon/>
                    <NotificationIcon/>
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
                        <input id="newCusDOB"  type="text" className="field inputField"  name='occupation' defaultValue={this.state.customer.occupation} />
                        

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
                            
                            <p id="designation">{this.state.customer.occupation.length <15?this.state.customer.occupation:this.state.customer.occupation.splice(12)}</p>
                            <div id="statusDiv">
                            <p id="statusDot" style={{"color":this.state.customer.statusBackgroundColor}}>.</p>
                            <p id="statusTxt" style={{"color":this.state.customer.statusBackgroundColor}}>{this.state.customer.statusText}</p>
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
                                <p>Outcome<p>*</p></p>
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