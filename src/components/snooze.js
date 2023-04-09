import React from "react";
import Trash from "../images/Trash.svg"
import Date_range from "../images/Date_range.svg"
import Time from "../images/Time.svg"
import dateToString from "../dateToString";

// import "../styles/home.css"
class SnoozeMenu extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            completedTaskMenu:'none',
            currentTask:{...this.props.currentTask}
        }
        this.snoozeTask = this.snoozeTask.bind(this)
    }
    snoozeTask(){
        let container = document.querySelector("#snoozeTaskDiv")
        let date = container.querySelector("#date")
        let time = container.querySelector("#time")
        let obj = this.state.currentTask
        obj.date = new Date(date.value +"T"+time.value)

        fetch("/snoozeTask",{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          })
    }
    render(){
        return(
    <div id="snoozeTaskScreen" style={{'display':this.props.display,'zIndex':2,'position':'absolute '}} >
      <div id="snoozeTaskDiv">
          <div id="portion1">
          <button id="closeIcon" onClick={this.props.toggleSnoozeTaskMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" fill="#7B86A7" fillOpacity="0.25" />
              <path d="M16 8L8 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 8L16 16" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
          </button>
          </div>
          <div id="portion2">
          <input id="title" type="text" placeholder="Add title" value={this.props.currentTask.title} disabled />
          <textarea name="" id="desc" placeholder="Description" value={this.props.currentTask.body} disabled ></textarea>
          <div id="fieldDiv">
              <div className="field">
              <img src={Date_range} alt="date"/>
              <input type="date" id="date" value={dateToString(new Date(this.props.currentTask.date),2).replace(/ /g,"-")} />
              </div>
              <div className="field">
              <img src={Time} alt="time"/>
              <input type="time" id="time" value={new Date(this.props.currentTask.date).getHours().toString().padStart(2,"0")+":"+new Date(this.props.currentTask.date).getMinutes().toString().padStart(2,"0")} />
              </div>
          </div>
          </div>
          <button id="save" onClick={this.snoozeTask} >
          Save
          </button>
      </div>      
    </div>
        )
    }
}


export default SnoozeMenu;