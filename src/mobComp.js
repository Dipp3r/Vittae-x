import React from "react"
import { WithRouter } from "./routingWrapper"
import checkString from "./stringChecker"
class MobComp extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
        this.changeInVal = this.changeInVal.bind(this)
        this.submit = this.submit.bind(this)
        this.submitLink = 'verifyID'
        this.loc = '../'
        this.title='TITLE HERE'
    }
    changeInVal(e){
        if(e.keyCode == 13){
            this.submit()
        }
        let obj = {};
        obj[e.target.name] = e.target.value.trim();
        this.setState(obj);
    }
    async submit(){
        let obj = {}
        let checkRes = checkString(this.state.number,3)
        console.log(checkRes)
        this.setState({numberErr:checkRes.msg})
        if(!checkRes.bool)  return
        obj = {number: this.state.number}
        console.log(obj)
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
        console.log(this.state)
        return(       
            
        <section className="phonePg">
            <div id="phoneSignUpFormDiv">
                <div id="phoneSignUpTextDiv">
                <p id="phoneSignUpText">{this.title}</p>
                </div>
                <div id="fieldBox">
                <p id="mobileLable">Mobile number</p>
                <input onChange={this.changeInVal} onKeyDown={this.changeInVal} name='number' type="number" min={0} max={9999999999} placeholder="1234567890" id="mobileField" />
                <p>{this.state.numberErr}</p>
                <button id="Button" onClick={this.submit}>SIGN UP</button>
                </div>
            </div>
        </section>
        )
    }
}

export default MobComp