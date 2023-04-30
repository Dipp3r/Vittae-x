import React from "react";

//importing images
import blueDot from "../images/blueDot.svg"
import Check_ring from "../images/Check_ring.svg"
import arrow_right from "../images/arrow_right.svg"
import Alarmclock from "../images/Alarmclock.svg"

import Trash from "../images/Trash.svg"
import Date_range from "../images/Date_range.svg"
import Time from "../images/Time.svg"

import { WithRouter } from "../routingWrapper";
import dateToString from "../dateToString";
import SnoozeMenu from "../components/snooze";
const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
class HomeComp extends React.Component{
    constructor(props){
      super(props)
      this.state={
        lastSelectedDate:null,
        today:new Date(),
        completedTaskMenu:'none',
        snoozeTaskMenu:"none",
        currentTask:{}
      }
      this.tasks = []
      this.date = []
      this.generateDates = this.generateDates.bind(this)
      this.getTasksPerDate = this.getTasksPerDate.bind(this)
      this.generateTasks = this.generateTasks.bind(this)
      this.toggleCompletedTaskMenu = this.toggleCompletedTaskMenu.bind(this)
      this.completeTask = this.completeTask.bind(this)
      this.toggleSnoozeTaskMenu = this.toggleSnoozeTaskMenu.bind(this)
    }
    generateDates(){

    //     <div className="date">
    //     <p id="day">Sun</p>
    //     <p id="date">01</p>
    //     <img id="reminderOverlay" src="../static/images/dot1.svg" alt="dot">
    //   </div>

      let dates = document.querySelector('#dates')
      dates.innerHTML = ''
      let dateDiv,day,date,remainder;
      let i =0
      let today = this.state.today
      let isDateIndexInc = false
      let dateIndex = 0
      let isTaskPresent = false;
      // this.generateTasks([])
      for(let dt = new Date(today.getFullYear(),today.getMonth(),1);dt<= new Date(today.getFullYear(),today.getMonth()+1,0);dt.setDate(dt.getDate()+1)){
        isTaskPresent = false
        console.log(dt.getDate(),dt)
        dateDiv = document.createElement('div')
        dateDiv.className = 'date'
        dateDiv.name = -1
        dateDiv.onclick = this.getTasksPerDate

        date = document.createElement('p')
        date.id = 'date'
        
        day = document.createElement('p')
        day.id = 'day'
        remainder = document.createElement('img')
        remainder.id = 'reminderOverlay'
        remainder.src = blueDot
        remainder.style.visibility = "hidden"
        
        day.innerText = dayName[dt.getDay()].slice(0,3)
        date.innerText = dt.getDate() < 10?`0${dt.getDate()}`:dt.getDate();
        dateDiv.append(day)
        dateDiv.append(date)
        dateDiv.append(remainder)

        
        remainder.style.color = 'transparent'

        if(dateIndex < this.date.length){

          if(dt.toDateString() == new Date(this.date[dateIndex].date).toDateString()){
            remainder.style.color = 'rgba(34, 63, 128, 1)'
            // date.style.backgroundColor = '#a5b3cd'
            // date.style.color = 'white'
            dateDiv.name = dateIndex 
            dateIndex+=1
            isDateIndexInc = true
            remainder.style.visibility = 'visible'
            isTaskPresent = true
          }
        }
        if (dt.toDateString() == today.toDateString()){
          date.style.backgroundColor = '#a5b3cd'
          date.style.color = 'white'
        }
        if(!this.state.lastSelectedDate){
          if (dt.toDateString() == today.toDateString()){
            // date.style.backgroundColor = '#a5b3cd'
            // date.style.color = 'white'
            // console.log(dateDiv.scrollIntoView({ behavior: "smooth",inline:'center'}))
            dateDiv.scrollIntoView({ behavior: "smooth",inline:'center'})
            this.setState({lastSelectedDate:dt.getDate()},()=>{
              document.querySelectorAll(".date")[this.state.lastSelectedDate-1].scrollIntoView({ behavior: "smooth",inline:'center'})
            })
            console.log(this.date,dateIndex,isDateIndexInc,isTaskPresent)
            if (isTaskPresent){
              if(this.date == undefined){
                this.generateTasks();
              }else if(this.date.length == 0){
                this.generateTasks();
              }else if (isDateIndexInc){
                console.log(this.date[dateIndex-1])
                this.generateTasks(this.date[dateIndex-1].tasks)
              }else{
                this.generateTasks(this.date[dateIndex].tasks)
              }
            }else{
              this.generateTasks()
            }
            
          }
          }else if (dt.getDate() == this.state.lastSelectedDate){
          date.style.backgroundColor = '#223f80'
          date.style.color = 'white'
        }
        dates.appendChild(dateDiv)
      }
    }
    getTasksPerDate(e){
      let dateIndex = e.currentTarget.name
      let dateDivList = document.querySelectorAll(".date")

      let lastSelectedDateDiv = dateDivList[this.state.lastSelectedDate-1]

      if (lastSelectedDateDiv.querySelector('#date').innerText == new Date().getDate()){
        lastSelectedDateDiv.querySelector('#date').style.backgroundColor = '#a5b3cd'
        lastSelectedDateDiv.querySelector('#date').style.color = 'white'
      }else{
        lastSelectedDateDiv.querySelector('#date').style.backgroundColor = 'transparent'
        lastSelectedDateDiv.querySelector('#date').style.color = 'black'
      }
      e.currentTarget.querySelector('#date').style.backgroundColor = '#223f80'
      e.currentTarget.querySelector('#date').style.color = 'white'
      this.generateTasks(dateIndex == -1?[]:this.date[dateIndex].tasks )

      let homeCompState = this.props.getItem("homeCompState")
      let nextElementIndex = Array.prototype.indexOf.call(dateDivList,e.currentTarget)+1
      homeCompState.lastSelectedDate = nextElementIndex
      this.props.setItem(homeCompState)
      this.setState({lastSelectedDate:nextElementIndex})
    }
    generateTasks(taskList){
      // <div className="task">
      
      //     <div className="desc">
      //       <p id="title">Follow up call</p>
      //       <div id="deets">
      //         <p id="name">Deekay</p>
      //         <p id="due">
      //           Due in <a id="num_days">3 days</a>
      //         </p>
      //       </div>
      //       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
      //     </div>
      console.log(taskList)
      document.body.querySelector('#tasks').innerHTML = ''
      let task,desc,i,container
      container = document.createElement('div')
      if(taskList == undefined) taskList = []
      if(taskList.length == 0){
        container.id = 'taskEmpty'
        let p1 = document.createElement('p')
        p1.innerText ="No task for this day"
        container.appendChild(p1)
        document.body.querySelector('#tasks').appendChild(container)
        return
      }
      container.id = 'nonEmpty'

      for (let j = 0;j< taskList.length;j++){
        console.log(i)
        i = taskList[j]
        if(i.completed) continue
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

        details.appendChild(name)
        details.appendChild(due)
        desc.appendChild(title)
        desc.appendChild(details)
        task.appendChild(desc)

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

        name.innerText = i.name
        title.innerText = i.title
        day.innerText = i.day
        due.innerText = `Due in ${i.due} days`
        if (i.due == null) due.style.display = 'none'
        // task.appendChild(desc)
        console.log(task)
        container.appendChild(task)
      }
      document.body.querySelector('#tasks').appendChild(container)
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
      for(let date of this.date){
        for (let task of date.tasks){
          if(task.id == Number.parseInt(this.currentTask)){
            currentTask = task;
            currentDate = date
            break;
          }
        }
      }

      currentTask.completed = true
      currentTask.outcome = outcome 
      this.setState({customer:customer})
      this.generateTasks(currentDate.tasks)
      this.toggleCompletedTaskMenu()
      fetch("/completeTask",{
          method:'post',
          body:JSON.stringify({id :this.currentTask,broker_id:localStorage.getItem("id"),outcome:outcome}),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      })
    }
    componentDidMount(){
      fetch("/getTasksForMonth",{
        method:'POST',
        body:JSON.stringify({date:dateToString(this.state.today).replace(/ +/g,"-"),broker_id:localStorage.getItem("id")}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then((response)=>{
        return response.json()})
      .then(data=>{
        this.date = data
        this.setState(this.props.getItem("homeCompState"),()=>{

        this.generateDates()
        console.log(this.state.lastSelectedDate)
        if(this.state.lastSelectedDate){
          let dateDiv = document.querySelectorAll(".date")[this.state.lastSelectedDate-1]
          dateDiv.scrollIntoView({ behavior: "smooth",inline:'center'})
          if(dateDiv) this.generateTasks(dateDiv.name == -1?[]:this.date[dateDiv.name].tasks)
        }
        // else{
        //   this.generateTasks()
        // }
        })
      })
      .catch(()=>{
        this.props.navigate("/*")
      })
    }
    toggleCompletedTaskMenu(e){
      let completedTaskMenu = this.state.completedTaskMenu
      let menu = document.querySelector('#completedTaskScreen')
       
      if(completedTaskMenu != "flex") this.currentTask = e.currentTarget.value

      completedTaskMenu = completedTaskMenu == "none"?"flex":'none'
       
      if(completedTaskMenu == 'flex'){
          let taskObj
          for(let date of this.date){
            for (let task of date.tasks){
              if(task.id == Number.parseInt(this.currentTask)){
                  taskObj = task;
                  break;
              }
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
    toggleSnoozeTaskMenu(e){
      let display = this.state.snoozeTaskMenu
      let taskObj = {}
      if(display == 'none'){
        for(let date of this.date){
          for (let task of date.tasks){
            // console.log(task,e.currentTarget.getAttribute("value"))
            if(task.id == Number.parseInt(e.currentTarget.getAttribute("value"))){
                taskObj = task;
                taskObj.date = new Date(taskObj.date).toISOString()
                console.log(task)
                break;
            }
          }
        }
      }else{
        let dateDiv = document.querySelectorAll(".date")[this.state.lastSelectedDate-1]
        if(dateDiv) this.generateTasks(dateDiv.name == -1?[]:this.date[dateDiv.name].tasks)
        this.componentDidMount()
      }
      // console.log(taskObj)

      display = display == "flex"?"none":"flex"
      this.setState({snoozeTaskMenu:display,currentTask:taskObj})
    }
    render(){
      
        return(
<div id='homeMain'>
    <div id="perks">
      <button id="perk" className="renumeration" onClick={this.props.navigate} value="../renumeration" >
        <p>₹ 0</p>
        <p className="description">Commissions from clients</p>
      </button>
      <button id="perk" className="incentive" onClick={this.props.navigate} value="../incentive" >
        <p>0/100</p>
        <p className="description">Number of customers to reach incentives</p>
      </button>
    </div>

    <div id="reminderDiv">
      <div id="calendar">
        <div id="months">
          <p>
            {months[this.state.today.getMonth()].slice(0,3)} {this.state.today.getFullYear()}
          </p>
          <button id="monthView" onClick={this.props.navigate} value="../monthlyview"   >
            Monthly view
            <img src={arrow_right} alt="right click"/>
          </button>
        </div>

        <div className="week">
          <div className="dates" id='dates'>
{/* 
            <div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div> */}
          </div>
        </div>
      </div>
    <div id='tasks'>
      <div id="nonEmpty">
          <div className="task"></div>
      </div>
    <div>
    </div>
  </div>
    <button id="overdueDiv" onClick={this.props.navigate} value="../tasks"  >
      <p>Overdue task</p>
      <img src={arrow_right} alt="enter icon"/>
    </button>
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
        )
    }
}

export default WithRouter(HomeComp)