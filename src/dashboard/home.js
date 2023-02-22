import React from "react";

class HomeComp extends React.Component{
    constructor(props){
        super(props)
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
    componentDidMount(){
        this.generateDates('2022-01-01','2022-01-12')
    }
    generateTasks(){
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
  
      //     <button className="label">
      //       <img src={require("../images/Check_ring.svg")} alt="completed"/>
      //       <p>Completed</p>
      //     </button>
  
      //     <button  className="label">
      //       <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
      //       <p>Snooze</p>
      //     </button>
      //   </div>

      let task = document.createElement('div')
      task.id = 'task'
      
    }
    render(){
        return(
<div >
    <div id="perks">
      <button id="perk">
        <p>₹ 120.5</p>
        <p className="description">Commissions from clients</p>
      </button>
      <button id="perk" className="incentive">
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
          <button id="monthView">
            Monthly view
            <img src={require("../images/arrow_right.svg")} alt="right click"/>
          </button>
        </div>

        <div className="week">
          <div className="dates" id='dates'>

            <div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div>
  
            <div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div>
  
            <div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div>
          <div className="dates">

            <div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div><div className="date">
              <p id="day">Sun</p>
              <p id="date">01</p>
              <p id="reminderOverlay">.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="tasks">
      <div id="taskEmpty">
        <p>Not task for this day</p>
      </div>
      <div id="nonEmpty">
        
  
        <div className="task">
  
          <div className="desc">
            <p id="title">KYC</p>
            <div id="deets">
              <p id="name">Deekay</p>
              <p id="due">
                Due in <a id="num_days">3 days</a>
              </p>
            </div>
            <p id="day">Sat Feb 9, 2023, 05:00 PM</p>
          </div>
  
          <button className="label">
            <img src={require("../images/Check_ring.svg")} alt="completed"/>
            <p>Completed</p>
          </button>
  
          <button  className="label">
            <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
            <p>Snooze</p>
          </button>
        </div>
  
        <div className="task">
  
          <div className="desc">
            <p id="title">Call</p>
            <div id="deets">
              <p id="name">Deekay</p>
              <p id="due">
                Due in <a id="num_days">3 days</a>
              </p>
            </div>
            <p id="day">Mon Feb 9, 2023, 05:00 PM</p>
          </div>
  
          <button className="label">
            <img src={require("../images/Check_ring.svg")} alt="completed"/>
            <p>Completed</p>
          </button>
  
          <button  className="label">
            <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
            <p>Snooze</p>
          </button>
        </div>
  
        <div className="task">
  
          <div className="desc">
            <p id="title">Follow up call</p>
            <div id="deets">
              <p id="name">Deekay</p>
              <p id="due">
                Due in <a id="num_days">3 days</a>
              </p>
            </div>
            <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
          </div>
  
          <button className="label">
            <img src={require("../images/Check_ring.svg")} alt="completed"/>
            <p>Completed</p>
          </button>
  
          <button  className="label">
            <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
            <p>Snooze</p>
          </button>
        </div>
  
        <div className="task">
  
          <div className="desc">
            <p id="title">Follow up call</p>
            <div id="deets">
              <p id="name">Deekay</p>
              <p id="due">
                Due in <a id="num_days">3 days</a>
              </p>
            </div>
            <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
          </div>
  
          <button className="label">
            <img src={require("../images/Check_ring.svg")} alt="completed"/>
            <p>Completed</p>
          </button>
  
          <button  className="label">
            <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
            <p>Snooze</p>
          </button>
        </div>
  
        <div className="task">
  
          <div className="desc">
            <p id="title">Follow up call</p>
            <div id="deets">
              <p id="name">Deekay</p>
              <p id="due">
                Due in <a id="num_days">3 days</a>
              </p>
            </div>
            <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
          </div>
  
          <button className="label">
            <img src={require("../images/Check_ring.svg")} alt="completed"/>
            <p>Completed</p>
          </button>
  
          <button  className="label">
            <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
            <p>Snooze</p>
          </button>
        </div>
  
        <div className="task">
  
          <div className="desc">
            <p id="title">Follow up call</p>
            <div id="deets">
              <p id="name">Deekay</p>
              <p id="due">
                Due in <a id="num_days">3 days</a>
              </p>
            </div>
            <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
          </div>
  
          <button className="label">
            <img src={require("../images/Check_ring.svg")} alt="completed"/>
            <p>Completed</p>
          </button>
  
          <button  className="label">
            <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
            <p>Snooze</p>
          </button>
        </div>
  
        <div className="task">
  
          <div className="desc">
            <p id="title">Follow up call</p>
            <div id="deets">
              <p id="name">Deekay</p>
              <p id="due">
                Due in <a id="num_days">3 days</a>
              </p>
            </div>
            <p id="day">Thu Feb 9, 2023, 05:00 PM</p>
          </div>
  
          <button className="label">
            <img src={require("../images/Check_ring.svg")} alt="completed"/>
            <p>Completed</p>
          </button>
  
          <button  className="label">
            <img src={require("../images/Alarmclock.svg")} alt="snooze"/>
            <p>Snooze</p>
          </button>
        </div>
      </div>
      

    </div>
    <button id="overdueDiv">
      <p>Overdue task (12)</p>
      <img src={require("../images/arrow_right.svg")} alt="enter icon"/>
    </button>
  </div>
</div>
        )
    }
}

export default HomeComp