import React from "react";
import { WithRouter } from "../routingWrapper";

class HomeComp extends React.Component{
    constructor(props){
        super(props)
        this.tasks = [{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'},{title:'Follow up call',name:'AAA',due:'2',day:'Thu Feb 9, 2023, 05:00 PM'}]
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
        for(var arr=[],dt=new Date(startDate); dt<=new Date(endDate); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
            console.log(dt)
            dateDiv = document.createElement('div')
            dateDiv.className = 'date'
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

            dates.appendChild(dateDiv)
        }
        console.log(arr)
        return arr
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
        this.generateDates('2023-02-01','2023-02-28')
        this.generateTasks(this.tasks)
    }
    render(){
        return(
<div id='homeMain'>
    <div id="perks">
      <button id="perk" className="renumeration" onClick={this.props.navigate} value="../renumeration" >
        <p>₹ 120.5</p>
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