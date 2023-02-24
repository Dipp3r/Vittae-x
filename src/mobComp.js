import React from "react"
import { WithRouter } from "./routingWrapper"
import checkString from "./stringChecker"
class MobComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.submitLink = 'verifyID'
        this.loc = '../'
        this.title='TITLE HERE'
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.changeColor  = this.changeColor.bind(this)
    }
    changeInVal(e){
        if(e.keyCode == 13){
            this.submit()
        }
        
        let value = e.currentTarget.value
        console.log(value.match(/^[0-9]/))
        let obj = {};
        obj[e.currentTarget.name] = value.trim();
        this.setState(obj);
    }
    changeColor(element,color){
        document.querySelector(element).style.borderColor = color
      }
    async submit(){
        let obj = {}
        let checkRes = checkString(this.state.number,3)
        let defaultColor = '#616161',invalidColor = '#BB2230';

        // console.log(checkRes)
        this.setState({numberErr:checkRes.msg})
        this.changeColor('#mobileField',defaultColor)
        if(!checkRes.bool){
            this.changeColor('#mobileField',invalidColor)
            
            return
        }
        obj = {number: this.state.number}
        console.log(obj)
        
        this.setItem('number',this.state.number)
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((data)=>{
            console.log(data)
            if(data.status) this.props.navigate(this.loc)
        })
    }
    render(){
        console.log(this.props)
        console.log(this.props.setItem)
        return(       
            
        <section className="phonePg">
            <div id="phoneSignUpFormDiv">
                <div id="phoneSignUpTextDiv">
                <p id="phoneSignUpText">{this.title}</p>
                </div>
                <div id="fieldBox">
                <p id="mobileLable">Mobile number</p>
                <input onChange={this.changeInVal} onKeyDown={this.changeInVal}  onFocus={()=>this.changeColor('#mobileField','#223F80')} onBlur={()=>this.changeColor('#mobileField','#b8b8b8')} name='number' type="number"  placeholder="1234567890" id="mobileField" value={this.state.number} />
                <p className='invalid'>{this.state.numberErr}</p>
                <button id="Button" onClick={this.submit}>SIGN UP</button>
                </div>
            </div>
        </section>
        )
    }
}

export default MobComp