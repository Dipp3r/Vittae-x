import React from "react";
import { WithRouter } from "../routingWrapper";

class Tasks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currSection:0,
            data:{overDue:[{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'}],upComing:[],completed:[]}
        }
        this.displaySection =  this.displaySection.bind(this)
        this.changeCurrentSection = this.changeCurrentSection.bind(this)
    }
    displaySection(){
        let taskList
        switch(this.state.currSection){
            case 0:
                //overDue
                taskList = this.state.data.overDue
                break
            case 1:
                taskList = this.state.data.upComing
                break
            case 2:
                taskList = this.state.data.completed
                break
            default:
                taskList = this.state.data.overDue
                break
        }
        let container = document.body.querySelector('#tasks')
        container.innerHTML = ''
        let task,desc,i
        // console.log(taskList.length)
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
                console.log(i)
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

                name.innerText = i.name
                title.innerText = i.title
                day.innerText = i.day
                due.innerText = `Due in ${i.due} days`

                // task.appendChild(desc)
                card.appendChild(task)
            }
        }
        container.appendChild(card)
    }
    changeCurrentSection(e){
        // console.log(e)
        let obj = {}
        obj.currSection = e.currentTarget.name
        this.setState(obj)
    }
    componentDidMount(){
        this.displaySection()
    }
    render(){
        return(
             <section id="Tasks">
             <nav id="navBar">
               <button>
                 <img src={require("../images/arrow_left_white.svg")} alt="back"/>
               </button>
               <p id="navTxt">Tasks</p>
             </nav>
             <div id="statusBar">
               <div id="statusButton">
                 <button class="statusButton" name='0' onClick={this.changeCurrentSection}  >Overdue(12)</button>
                 <button class="statusButton" name='1' onClick={this.changeCurrentSection}  >Upcoming</button>
                 <button class="statusButton" name='2'onClick={this.changeCurrentSection}  >Completed</button>
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