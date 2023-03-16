import React from "react";
import { WithRouter } from "../routingWrapper";

import '../styles/tasks.css'

class Tasks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lastSession:undefined,
            currSection:0,
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
    }
    displaySection(currSection){
        
        let taskList
        let dateColor = 'black'
        switch(currSection){
            case 0:
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
            default:
                taskList = this.state.data.overDue
                taskList = taskList.sort((a,b)=>{return new Date(a.date).getTime()-new Date(b.date).getTime()})
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
                  img1.src = require("../images/Check_ring.svg")
                  img1.alt = 'completed'
                  let p1 = document.createElement('p')
                  p1.innerText = 'completed'
                  completeButton.appendChild(img1)
                  completeButton.appendChild(p1)
                  task.appendChild(completeButton)

                  let snoozeButton = document.createElement('button')
                  snoozeButton.className = 'label'
                  let img2= document.createElement('img')
                  img2.src = require("../images/Alarmclock.svg")
                  img2.alt = 'completed'
                  let p2 = document.createElement('p')
                  p2.innerText = 'snooze'
                  snoozeButton.appendChild(img2)
                  snoozeButton.appendChild(p2)
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
    componentDidMount(){
      this.displaySection(0)
      this.setState({lastSession:document.querySelector('.statusButton')})
    }
    render(){
        return(
             <section id="Tasks">
             <nav id="navBar">
               <button>
                 <img onClick={this.props.navigate} value='../dashboard'  src={require("../images/arrow_left_white.svg")} alt="back"/>
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
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")} alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
             
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")} alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
           
                   <div class="task">
                     <div class="desc">
                       <p id="title">Follow up call</p>
                       <p id="name">Deekay</p>
                       <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
                     </div>
             
                     <button class="label">
                       <img src={require("../images/Check_ring.svg")}alt="completed"/>
                       <p>Completed</p>
                     </button>
             
                     <button  class="label">
                       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
                       <p>Snooze</p>
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </section>
        )
    }
}

export default WithRouter(Tasks)