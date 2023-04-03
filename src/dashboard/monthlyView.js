import React from "react";
import { WithRouter } from "../routingWrapper";

import back_white from "../images/back_white.svg"
import Check_ring from "../images/Check_ring.svg"
import Alarmclock from "../images/Alarmclock.svg"
import calendar_left_arrow from "../images/calendar_left_arrow.svg"
import calendar_right_arrow from "../images/calendar_right_arrow.svg"
import "../styles/months.css"
import dateToString from "../dateToString"
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
class MonthlyView extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            currentDate :new Date(),
            selectedDate:new Date().getDate(),
            tasksList:[
                {title:'Follow up call',name:'AAA',due:'10',day:'Mar 9, 2023'},
                {title:'fafawf',name:'AAA',due:'15',day:'Thu Feb 10, 2023'},
                {title:'w3tdfgves',name:'AAA',due:'20',day:'Thu Feb 12, 2023'},
                {title:'gbvdw3eqt',name:'AAA',due:'25',day:'Thu Feb 20, 2023'},
                {title:'waqwtg',name:'AAA',due:'30',day:'Mar 10, 2023'},
                {title:'tgywsv ',name:'AAA',due:'35',day:'Mar 20, 2023'}
              ]
        }
        this.changeMonth = this.changeMonth.bind(this)
        this.generateDates = this.generateDates.bind(this)
        this.selectDate = this.selectDate.bind(this)
        this.displayTasks = this.displayTasks.bind(this)
    }
    async changeMonth(e){
        let value = Number.parseInt(e.currentTarget.getAttribute("value"))
        let month = Number.parseInt(this.state.currentDate.getMonth())
        let year = Number.parseInt(this.state.currentDate.getFullYear())

        month += value
        if(month ==-1){
            month = 11;
            year-=1
        }else if(month == 12){
            month = 0
            year+=1
        }
        let date = new Date(year,month)
        let today = new Date()

        let selectedDate = (date.getMonth() == today.getMonth() && date.getFullYear == today.getFullYear())?today.getDate:1;

        let data = await fetch("/getTasksForMonth",{
            method:'POST',
            body:JSON.stringify({date:dateToString(date).replace(/ +/g,"-"),broker_id:this.props.getItem("id")}),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          })
          .then((response)=>{
            return response.json()})

        this.setState({currentDate:date,selectedDate:selectedDate,tasksList:data},()=>{

            this.generateDates()
            this.selectDate()
            
        })
    }
    generateDates(){
        let container = document.querySelector("#datesContainer")
        container.innerHTML = ""
        let currentDate = this.state.currentDate
        let button,time;
        let dateIndex = 0
        //filtering task list for this month .filter((element)=>{ return (new Date(element.day).getMonth() == currentDate.getMonth())})
        let tasksList = this.state.tasksList

        //generating dates
        for(let dt = new Date(currentDate.getFullYear(),currentDate.getMonth(),1);dt< new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0);dt.setDate(dt.getDate()+1)){
            button = document.createElement("button")
            if(dt.toDateString() === this.state.currentDate.toDateString()) button.className = "today"
            button.className = null
            // button.style.color = "black"
            // button.style.backgroundColor = "transparent"
            
            if(dateIndex < tasksList.length){
                let date2 = new Date(tasksList[dateIndex].date)
                console.log(dt,date2)
                if(dt.getDate() == date2.getDate() && dt.getMonth() == date2.getMonth() && dt.getFullYear() == date2.getFullYear()){
                    button.className = "hasTasks"
                    dateIndex+=1
                }
            }
            time = document.createElement("time")
            time.innerText = dt.getDate()
            button.value = dt.getDate()
            button.appendChild(time)
            button.onclick = this.selectDate
            container.appendChild(button)
        }
        
    }
    selectDate(e){
        let target = e?e.currentTarget:document.querySelector("#datesContainer").childNodes[this.state.selectedDate-1];
        let value = Number.parseInt(target.getAttribute("value"))
        let prevTarget = document.querySelector("#datesContainer").childNodes[this.state.selectedDate-1]

        prevTarget.style.color = null
        prevTarget.style.backgroundColor = null
        prevTarget.style.fontWeight = null
        target.style.color = "white"
        target.style.backgroundColor = "#223F80"
        target.style.fontWeight = "600"
        

        this.setState({selectedDate:value},this.displayTasks)
    }
    displayTasks(){
        let tasksList = this.state.tasksList.filter((element)=>{ return (new Date(element.date).getDate() == this.state.selectedDate)})
        console.log(tasksList,this.state.tasksList)
        tasksList = tasksList.length == 0?[]:tasksList[0].tasks
        let container = document.body.querySelector('#tasks')
        container.innerHTML = ''
        let task,desc,i,tasksDiv
      tasksDiv = document.createElement('div')
      if(tasksList.length == 0){
        tasksDiv.id = 'taskEmpty'
        let p1 = document.createElement('p')
        p1.innerText ="No task for this day"
        tasksDiv.appendChild(p1)
        container.appendChild(tasksDiv)
        return
      }
      tasksDiv.id = 'nonEmpty'
      console.log(tasksList)
      for (let j = 0;j< tasksList.length;j++){
        i = tasksList[j]
        
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
        task.appendChild(snoozeButton)

        name.innerText = i.name
        title.innerText = i.title
        day.innerText = i.day
        due.innerText = `Due in ${i.due} days`
        if (i.due == null) due.style.display = "none"
        // task.appendChild(desc)
        tasksDiv.appendChild(task)
      }
      container.appendChild(tasksDiv)

    }
    componentDidMount(){
        fetch("/getTasksForMonth",{
            method:'POST',
            body:JSON.stringify({date:dateToString(new Date()).replace(/ +/g,"-"),broker_id:this.props.getItem("id")}),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          })
          .then((response)=>{
            return response.json()})
            .then(data=>{
                this.setState({tasksList:data},()=>{
                    this.generateDates()
                    this.selectDate()
                    this.displayTasks()
                })
            })
    }
    
    render(){
        console.log(this.state)
        return(
            <section id="monthly_view">
                <div id="topBar">
                    <button onClick={this.props.navigate} value="../dashboard">
                    <img src={back_white} alt="back icon"/>
                    </button>
                    <p>Monthly view</p>
                    <div></div>
                </div>
                <div className="calendar">
                    <div className="month">
                        <a href="#" className="nav" onClick={this.changeMonth} value={-1}>
                            <img src={calendar_left_arrow} alt="previous"/>
                        </a>
                        <div className="month_name">{months[this.state.currentDate.getMonth()].slice(0,3)} <span>{this.state.currentDate.getFullYear()}</span></div>
                        <a href="#" className="nav"onClick={this.changeMonth} value={1}>
                            <img src={calendar_right_arrow} alt="next"/>
                            </a>
                    </div>
                    <div className="days">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    </div>
                    <div className="dates" id="datesContainer">
                        <button>
                        <time>01</time>
                        </button>
                        <button>
                        <time>02</time>
                        </button>
                        <button>
                        <time>03</time>
                        </button>
                        <button>
                        <time>04</time>
                        </button>
                        <button>
                        <time>05</time>
                        </button>
                        <button>
                        <time>06</time>
                        </button>
                        <button>
                        <time>07</time>
                        </button>
                        <button>
                        <time>08</time>
                        </button>
                        <button>
                        <time>09</time>
                        </button>
                        <button>
                        <time>10</time>
                        </button>
                        <button>
                        <time>11</time>
                        </button>
                        <button>
                        <time>12</time>
                        </button>
                        <button>
                        <time>13</time>
                        </button>
                        <button>
                        <time>14</time>
                        </button>
                        <button>
                        <time>15</time>
                        </button>
                        <button>
                        <time>16</time>
                        </button>
                        <button>
                        <time>17</time>
                        </button>
                        <button className="today">
                        <time>18</time>
                        </button>
                        <button>
                        <time>19</time>
                        </button>
                        <button>
                        <time>20</time>
                        </button>
                        <button>
                        <time>21</time>
                        </button>
                        <button>
                        <time>22</time>
                        </button>
                        <button>
                        <time>23</time>
                        </button>
                        <button>
                        <time>24</time>
                        </button>
                        <button>
                        <time>25</time>
                        </button>
                        <button>
                        <time>26</time>
                        </button>
                        <button>
                        <time>27</time>
                        </button>
                        <button>
                        <time>28</time>
                        </button>
                        <button>
                        <time>29</time>
                        </button>
                        <button>
                        <time>30</time>
                        </button>
                        <button>
                        <time>31</time>
                        </button>
                    </div>
                </div>
                <div id="main">
                    <div id="tasks">
                    <div id="taskEmpty">
                        <p>Not task for this day</p>
                    </div>
                    <div id="nonEmpty">
                        <div className="task">

                        <div className="desc">
                            <p id="title">Follow up call</p>
                            <div id="deets">
                            <p id="name">Deekay</p>
                            <p id="due">
                                Due in <a id="num_days">3 days</a>
                            </p>
                            </div>
                            <p id="day">05:00 PM</p>
                        </div>
                
                        <button className="label">
                            <img src={Check_ring} alt="completed"/>
                            <p>Completed</p>
                        </button>
                
                        <button  className="label">
                            <img src={Alarmclock} alt="snooze"/>
                            <p>Snooze</p>
                        </button>
                        </div>
                
                        <div className="task">
                
                        <div className="desc">
                            <p id="title">KYC</p>
                            <div id="deets">
                            <p id="name">Deekay</p>
                            <p id="due">
                                Due in <a id="num_days">3 days</a>
                            </p>
                            </div>
                            <p id="day">05:00 PM</p>
                        </div>
                
                        <button className="label">
                            <img src={Check_ring} alt="completed"/>
                            <p>Completed</p>
                        </button>
                
                        <button  className="label">
                            <img src={Alarmclock} alt="snooze"/>
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

export default WithRouter(MonthlyView)