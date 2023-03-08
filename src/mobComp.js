import React from "react"
import { WithRouter } from "./routingWrapper"
import checkString from "./stringChecker"
import './styles/mobComp.css';

class MobComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.submitLink = 'http://dev.api.vittae.money/broker/send-otp/'
        this.loc = '../'
        this.title='TITLE HERE'
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.changeColor  = this.changeColor.bind(this)
        this.process = this.process.bind(this)
    }
    process(data){
        // child components have their own process function 
    }
    changeInVal(e){
        if(e.keyCode == 13){
            this.submit()
        }
        
        let value = e.currentTarget.value
        let obj = {};
        obj[e.currentTarget.name] = value.trim();
        this.setState(obj);
    }
    changeColor(element,color){
        document.querySelector(element).style.borderColor = color
      }
    async submit(){
        let obj = {}
        let checkRes = checkString(this.state.phone,3)
        let defaultColor = '#616161',invalidColor = '#BB2230';

        // console.log(checkRes)
        this.setState({phoneErr:checkRes.msg})
        this.changeColor('#mobileField',defaultColor)
        if(!checkRes.bool){
            this.changeColor('#mobileField',invalidColor)
            
            return
        }
        obj = {phone: this.state.phone}
        this.props.setItem(obj)
        
        this.props.setItem({phone:this.state.phone})
        fetch(this.submitLink,{
            method:'POST',
            body:JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => {
            if(response.status == 201){
                return response.json()
            }
            throw new Error('Something went wrong')
        })
        .then((data)=>{
            this.process(data)
        })
    }
    render(){
        return(       
            
        <section className="phonePg">
            <div id="phoneSignUpFormDiv">
                <div id="phoneSignUpTextDiv">
                    <p id="phoneSignUpText">{this.title}</p>
                </div>
                <div id="fieldBox">
                    <p id="mobileLable">Mobile number</p>
                    <input onChange={this.changeInVal} onKeyDown={this.changeInVal}  onFocus={()=>this.changeColor('#mobileField','#223F80')} onBlur={()=>this.changeColor('#mobileField','#b8b8b8')} name='phone' type="number"  placeholder="1234567890" id="mobileField" value={this.state.phone} />
                    <p className='invalid'>{this.state.phoneErr}</p>
                    
                </div>  
                <div id="buttonDiv"> 
                    <button id="Button" onClick={this.submit}>SIGN UP</button>
                </div>
            </div>
        </section>
        )
    }
}

export default MobComp