import React from "react";
import { WithRouter } from "../routingWrapper";
const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
class HomeComp extends React.Component{
    constructor(props){
      super(props)
      this.state={
        lastselectedDate:null
      }
      this.tasks = [
        {title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
        {title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
        {title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
        {title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
        {title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
        {title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'}
      ]
      this.date = [
        {date:'2023-03-01',tasks:[
          {title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
          {title:'Follow up call',name:'BBB',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'}]
        },
        {date:'2023-03-05',tasks:[
          {title:'Follow up call',name:'CCC',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
          {title:'Follow up call',name:'DDD',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'}]
        },
        {date:'2023-03-10',tasks:[
          {title:'Follow up call',name:'EEE',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
          {title:'Follow up call',name:'FFF',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'}]
        },
        {date:'2023-03-11',tasks:[
          {title:'Follow up call',name:'EFA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},
          {title:'Follow up call',name:'AAAFFWAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'}]
        }
      ]
      this.generateDates = this.generateDates.bind(this)
      this.getTasksPerDate = this.getTasksPerDate.bind(this)
      this.generateTasks = this.generateTasks.bind(this)
    }
    generateDates(startDate,endDate){
    //     <div className="date">
    //     <p id="day">Sun</p>
    //     <p id="date">01</p>
    //     <p id="reminderOverlay">.</p>
    //   </div>
      let dates = document.querySelector('#dates')
      dates.innerHTML = ''
      let dateDiv,day,date,remainder;
      let i =0
      let today = new Date()

      let dateIndex = 0

      for(let dt = new Date(today.getFullYear(),today.getMonth(),1);dt< new Date(today.getFullYear(),today.getMonth()+1,0);dt.setDate(dt.getDate()+1)){
        console.log(dt.toDateString())

        dateDiv = document.createElement('div')
        dateDiv.className = 'date'
        dateDiv.name = -1
        dateDiv.onclick = this.getTasksPerDate

        date = document.createElement('p')
        date.id = 'date'
        
        day = document.createElement('p')
        day.id = 'day'
        remainder = document.createElement('P')
        remainder.id = 'reminderOverlay'
        remainder.innerText = '.'
        let dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        day.innerText = dayName[dt.getDay()].slice(0,3)
        date.innerText = dt.getDate() < 10?`0${dt.getDate()}`:dt.getDate();
        dateDiv.append(day)
        dateDiv.append(date)
        dateDiv.append(remainder)

        
        remainder.style.color = 'transparent'
        if(dateIndex < this.date.length){
          console.log(dt.toDateString(),new Date(this.date[dateIndex].date).toDateString())
          if(dt.toDateString() == new Date(this.date[dateIndex].date).toDateString()){
            remainder.style.color = 'red'
            date.style.backgroundColor = '#a5b3cd'
            date.style.color = 'white'
            dateDiv.name = dateIndex 
            dateIndex+=1
          }
        }
        
        if (dt.toDateString() == today.toDateString()){
          date.style.backgroundColor = '#223f80'
          date.style.color = 'white'
          this.setState({lastselectedDate:dateDiv})
          this.generateTasks(this.date[dateIndex].tasks)
        }
        dates.appendChild(dateDiv)
      }
    }
    getTasksPerDate(e){
      let dateIndex = e.currentTarget.name
      let lastselectedDate = this.state.lastselectedDate
      console.log(lastselectedDate);
      if(lastselectedDate.name == -1){
        lastselectedDate.querySelector('#date').style.backgroundColor = 'transparent'
        lastselectedDate.querySelector('#date').style.color = 'black'
      }else{
        lastselectedDate.querySelector('#date').style.backgroundColor = '#a5b3cd'
        lastselectedDate.querySelector('#date').style.color = 'white'
      }
      e.currentTarget.querySelector('#date').style.backgroundColor = '#223f80'
      e.currentTarget.querySelector('#date').style.color = 'white'
      this.generateTasks(dateIndex == -1?[]:this.date[dateIndex].tasks )
      this.setState({lastselectedDate:e.currentTarget})
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
      document.body.querySelector('#tasks').innerHTML = ''
      let task,desc,i,container
      container = document.createElement('div')
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
        container.appendChild(task)
      }
      document.body.querySelector('#tasks').appendChild(container)
    }
    componentDidMount(){
      let date = new Date()
      console.log(date.getMonth)
      this.generateDates()
      // this.generateTasks(this.tasks)
    }
    render(){
        return(
<div id='homeMain'>
    <div id="perks">
      <button id="perk" className="renumeration" onClick={this.props.navigate} value="../renumeration" >
        <p>??? 120.5</p>
        <p className="description">Commissions from clients</p>
      </button>
      <button id="perk" className="incentive" onClick={this.props.navigate} value="../incentive" >
        <p>86/100</p>
        <p className="description">Number of customers to reach incentives</p>
      </button>
    </div>

    <div id="reminderDiv">
      <div id="calendar">
        <div id="months">
          <p>
            Feb 2023
          </p>
          <button id="monthView" onClick={this.props.navigate} value="../monthlyview"   >
            Monthly view
            <img src={require("../images/arrow_right.svg")} alt="right click"/>
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
          <div class="task"></div>
      </div>
    <div>
    </div>
  </div>
    <button id="overdueDiv" onClick={this.props.navigate} value="../tasks"  >
      <p>Overdue task (12)</p>
      <img src={require("../images/arrow_right.svg")} alt="enter icon"/>
    </button>
</div>
</div>
        )
    }
}

export default WithRouter(HomeComp)