import React from 'react';
import ReactDOM from 'react-dom/client';

class MainComp extends React.Component{
    constructor(){
        super()
        this.state = {

        }
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
                listInHTML += `<div>
                    <p>${data[i].name}</p>
                    <p>${data[i].dataOfReg}</p>
                    <p>${data[i].stage}</p>
                </div>`
            }
        })
    }
    render(){
        return(<section>
            <div id="listContainer">

            </div>
            <nav id="bottomNav">
                <button>Add customer</button>
                <button>Remuration</button>
                <button>Incentive</button>
            </nav>

        </section>)
    }
}

export default MainComp