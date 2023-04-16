import React from "react";
import { WithRouter } from "../routingWrapper";
import dateToString  from "../dateToString";
import '../styles/tasks.css'
import Check_ring from "../images/Check_ring.svg"
import Alarmclock from "../images/Alarmclock.svg"
import arrow_left_white from "../images/arrow_left_white.svg"

import Trash from "../images/Trash.svg"
import Date_range from "../images/Date_range.svg"
import Time from "../images/Time.svg"
import SnoozeMenu from "../components/snooze.js"
class Tasks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lastSession:undefined,
            currSection:0,
            completedTaskMenu:'none',
            snoozeTaskMenu:'none',
            currentTask:{},
            data:{  
              overDue:[
                {title:'Follow up call',name:'AAA',due:'2',date:'Feb 1, 2023, 12:00 PM'},
                {title:'Follow up call',name:'AAA',due:'2',date:'Feb 2, 2023, 00:00'},
                {title:'Follow up call',name:'AAA',due:'2',date:'Feb 3, 2023, 05:00 PM'},
                {title:'Follow up call',name:'AAA',due:'2',date:'Thu Feb 9, 2023, 05:00 PM'},
                {title:'Follow up call',name:'AAA',due:'2',date:'Thu Feb 9, 2023, 05:00 PM'},
                {title:'Follow up call',name:'AAA',due:'2',date:'Thu Feb 9, 2023, 05:00 PM'}],
            upComing:[
              {title:'Follow up call',name:'AAA',due:'2',date:'Mar 20, 2023, 12:00 PM'},
              {title:'Follow up call',name:'AAA',due:'2',date:'Nov 2, 2023, 00:00'},],
            completed:[
              {title:'Follow up call',name:'AAA',due:'2',date:'Feb 9, 2023, 12:00 PM'},
              {title:'Follow up call',name:'AAA',due:'2',date:'Feb 1, 2023, 00:00'}
            ]
            }
        }
        this.displaySection =  this.displaySection.bind(this)
        this.changeCurrentSection = this.changeCurrentSection.bind(this)
        this.completeTask = this.completeTask.bind(this)
        this.toggleCompletedTaskMenu = this.toggleCompletedTaskMenu.bind(this)
        this.toggleSnoozeTaskMenu = this.toggleSnoozeTaskMenu.bind(this)
      }
    displaySection(currSection){
        
        let taskList
        let dateColor = 'black'
        switch(currSection){
            case 0:
            default:
                //overDue
                taskList = this.state.data.overDue
                taskList = taskList.sort((a,b)=>{return new Date(a.date).getTime()-new Date(b.date).getTime()})
                dateColor = 'rgba(187, 34, 48, 1)'
                break
            case 1:
                taskList = this.state.data.upComing
                taskList = taskList.sort((a,b)=>{return new Date(a.date).getTime()-new Date(b.date).getTime()})
                dateColor = 'rgba(54, 54, 54, 1)'
                break
            case 2:
                taskList = this.state.data.completed
                taskList = taskList.sort((a,b)=>{return new Date(b.date).getTime()-new Date(a.date).getTime()})
                dateColor = 'rgba(98, 177, 111, 1)'
                break
        }
        let container = document.body.querySelector('#tasks')
        container.innerHTML = ''
        let task,desc,i
        let card;
        if(taskList.length == 0){
            card = document.createElement('div')
            card.id = 'taskEmpty'
            let p1 = document.createElement('p')
            p1.innerText ="No task for this day"
            card.appendChild(p1)
            container.appendChild(card)
        }else{
            card = document.createElement('div')
            card.id = 'nonEmpty'
            for (let j = 0;j< taskList.length;j++){
                i = taskList[j]
                if(i.completed == true && currSection != 2) continue
                task = document.createElement('div')
                task.className = 'task'

                desc = document.createElement('desc')
                desc.className = 'desc'
                let title = document.createElement('p')
                title.id  = 'title'
                let details = document.createElement('div')
                details.id = 'deets'
                let name  = document.createElement('p')
                name.id = 'name'
                let due = document.createElement('p')
                due.id = 'due' 
                let day = document.createElement('p')
                day.id = 'day'
                day.style.color = dateColor
                

                details.appendChild(name)
                details.appendChild(day)
                desc.appendChild(title)
                desc.appendChild(details)
                task.appendChild(desc)
                if(currSection < 2){
                  let completeButton = document.createElement('button')
                  completeButton.className = 'label'
                  let img1 = document.createElement('img')
                  img1.src = Check_ring
                  img1.alt = 'completed'
                  let p1 = document.createElement('p')
                  p1.innerText = 'completed'
                  completeButton.appendChild(img1)
                  completeButton.appendChild(p1)
                  completeButton.value = i.id
                  completeButton.onclick = this.toggleCompletedTaskMenu
                  task.appendChild(completeButton)

                  let snoozeButton = document.createElement('button')
                  snoozeButton.className = 'label'
                  let img2= document.createElement('img')
                  img2.src = Alarmclock
                  img2.alt = 'completed'
                  let p2 = document.createElement('p')
                  p2.innerText = 'snooze'
                  snoozeButton.appendChild(img2)
                  snoozeButton.appendChild(p2)
                  snoozeButton.value = i.id
                  snoozeButton.onclick = this.toggleSnoozeTaskMenu
                  task.appendChild(snoozeButton)
                }
                name.innerText = i.name
                title.innerText = i.title
                let dateValue = new Date(i.date)
                let hour = dateValue.getHours()
                let meridiem
                let minutes = dateValue.getMinutes()
                if (hour >= 12){
                  meridiem = 'pm'
                  if(hour != 12) hour -= 12
                }else{
                  if(hour == 0) hour = 12
                  meridiem = 'am'
                }
                function getFull(string){
                 return string<10?`0${string}`:string;
                }
                day.innerText = dateValue.toDateString() +", "+getFull(hour)+getFull(dateValue.getMinutes())+' '+meridiem
                // due.innerText = `Due in ${i.due} days`

                // task.appendChild(desc)
                card.appendChild(task)
            }
            console.log(card)
        }
        container.appendChild(card)
    }
    changeCurrentSection(e){
        let obj = {}
        obj.currSection = Number.parseInt(e.currentTarget.name)
        let lastSession = this.state.lastSession
        if(lastSession != undefined){
          lastSession.style.color = 'rgba(37, 53, 100, 0.4)'
          lastSession.style.borderBottomColor = 'rgba(37, 53, 100, 0.4)'
        }

        e.currentTarget.style.color = 'rgba(34, 63, 128, 1)'
        e.currentTarget.style.borderBottomColor = 'rgba(34, 63, 128, 1)'
        obj.lastSession = e.currentTarget
        this.setState(obj)
        this.displaySection(Number.parseInt(e.currentTarget.name))
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
      let currentDate;
      let taskList = [...this.state.data.overDue]
      taskList.push(this.state.data.upComing)
      for (let task of taskList){
        if(task.id == Number.parseInt(this.currentTask)){
          currentTask = task;
          break;
        }
      }
      console.log(currentTask)
      currentTask.completed = true
      currentTask.outcome = outcome 
      this.setState({customer:customer},()=>{
          this.displaySection(this.state.currSection)
          this.toggleCompletedTaskMenu()
      })
      fetch("/completeTask",{
          method:'post',
          body:JSON.stringify({id :this.currentTask,broker_id:this.props.getItem("id"),outcome:outcome}),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      })
    }
  toggleCompletedTaskMenu(e){
      let completedTaskMenu = this.state.completedTaskMenu == undefined?'none':this.state.completedTaskMenu ;
      let menu = document.querySelector('#completedTaskScreen')
       
      if(completedTaskMenu != "flex") this.currentTask = e.currentTarget.value

      completedTaskMenu = completedTaskMenu == "none"?"flex":'none'
       
      if(completedTaskMenu == 'flex'){
          let taskObj
          let taskList = [...this.state.data.overDue]
      taskList.push(this.state.data.upComing)
      for (let task of taskList){
        if(task.id == Number.parseInt(this.currentTask)){
          taskObj = task;
          break;
        }
      }
      menu.querySelector('#title').value = taskObj.title
      menu.querySelector('#desc').value = taskObj.body
      menu.querySelector("#date").value = dateToString(new Date(taskObj.date),2).replace(/ /g,"-")
      menu.querySelector('#time').value = new Date(taskObj.date).getHours().toString().padStart(2, '0')+":"+new Date(taskObj.date).getMinutes().toString().padStart(2, '0');
      menu.querySelector('#outcome').value = ""
      }
      this.setState({completedTaskMenu:completedTaskMenu},()=>{
        console.log(this.state)
      })
    }
    toggleSnoozeTaskMenu(e){
      console.log("toggled snoozeMenu")
      let display = this.state.snoozeTaskMenu
      let taskObj = {}
      if(display == 'none'){
        let taskList = [...this.state.data.overDue]
        taskList.push(this.state.data.upComing)
        for (let task of taskList){
          if(task.id == Number.parseInt(e.currentTarget.value)){
            taskObj = task;
            break;
          }
        }
        console.log(taskObj)
      }
      display = display == "flex"?"none":"flex"
      this.setState({snoozeTaskMenu:display,currentTask:taskObj})
    }
    componentDidMount(){
      
      fetch("/getTasksAll",{
        method:'POST',
        body:JSON.stringify({broker_id:this.props.getItem("id")}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then((response)=>{
        return response.json()})
        .then(data=>{
          console.log(data)
          this.setState({lastSession:document.querySelector('.statusButton'),data:data},()=>{
            this.displaySection(0)
          })
        })
    }
    render(){
        return(
             <section id="Tasks">
             <nav id="navBar">
               <button>
                 <img onClick={this.props.navigate} value='../dashboard'  src={arrow_left_white} alt="back"/>
               </button>
               <p id="navTxt">Tasks</p>
             </nav>
             <div id="statusBar">
               <div id="statusButton">
                 <button class="statusButton" name='0' onClick={this.changeCurrentSection} style={{color:'rgba(34, 63, 128, 1)',borderBottomColor:'rgba(34, 63, 128, 1)'}}  >overDue ({this.state.data.overDue.length })</button>
                 <button class="statusButton" name='1' onClick={this.changeCurrentSection}  >Upcoming ({this.state.data.upComing.length })</button>
                 <button class="statusButton" name='2'onClick={this.changeCurrentSection}  >Completed ({this.state.data.completed.length })</button>
               </div>
             </div>
             <hr id="statusBarEdge"/>
           
             <div id="main">
               <div id="tasks">
                 {/* <div id="taskEmpty">
                   <p>Not task for this day</p>
                 </div> */}
           
                 <div id="nonEmpty">

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
              {this.state.snoozeTaskMenu == "flex"?<SnoozeMenu display={this.state.snoozeTaskMenu} toggleSnoozeTaskMenu={this.toggleSnoozeTaskMenu} currentTask={this.state.currentTask} />:""}
             </div>
           </section>
        )
    }
}

export default WithRouter(Tasks)