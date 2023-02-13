import React from 'react';
import ReactDOM from 'react-dom/client';
import { WithRouter } from './routingWrapper';

class HomeComp extends React.Component{
    constructor(){
        super()
        this.state = {

        }
        this.getListOFCustomers = this.getListOFCustomers.bind(this);
    }
    getListOFCustomers(){
        var CustomerList = []
        var URL = ''
        var listInHTML = ''
        fetch(URL,{
            method:'GET'
        })
        .then(response => response.json())
        .then(raw_data=>{
            console.log(raw_data)
            var data = raw_data.data
            for(var i = 0;i<data.length;i++){
                var node = document.createElement('div')
                node.innerHTML = `<div>
                    <p>${data[i].name}</p>
                    <p>${data[i].dataOfReg}</p>
                    <p>${data[i].stage}</p>
                </div>`
                document.body.querySelector('#listContainer').appendchild(node)
            }
        })
    }
    render(){
        return(<section>
            <h1>HOME <br/>page here</h1>
        </section>)
    }
}

export default WithRouter(HomeComp)