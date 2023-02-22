import React from "react";

class ContactsComp extends React.Component {
    constructor(props){
        super(props)
        this.customerList = [{name:'aaa sfkeeb jksefkj nsejkfnjk snefjk ',mobile:'1234567123',status:'active',date:'01/02/2002'},
        {name:'bbb',mobile:'1234567812',status:'active',date:'01/02/2002'},
        {name:'ccc',mobile:'1234567820',status:'active',date:'01/02/2002'},
        {name:'ddd',mobile:'1234547890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'},
        {name:'eee',mobile:'1234347890',status:'active',date:'01/02/2002'}];
        this.displayCustomer = this.displayCustomer.bind(this)
    }
    displayCustomer(){
        let container = document.body.querySelector('#cardsList')
        container.innerHTML = ''

        for(let i of this.customerList){
            let cards = document.createElement('div')
            cards.className = 'cards'
            let details = document.createElement('div')
            details.className = 'details'

            let name = document.createElement('button')
            name.className = 'info'
            let mobile = document.createElement('button')
            mobile.className = 'info'
            let status = document.createElement('button')
            status.className = 'info status'
            let statusIcon = document.createElement('i')
            statusIcon.className = 'down'
            status.append(statusIcon)
            statusIcon.innerText = '.'

            let dateButton = document.createElement('button')
            dateButton.className = 'info dateDiv'
            let date = document.createElement('p')
            date.className = 'date'
            let filterTag = document.createElement('div')
            filterTag.className = 'filterTag'
            dateButton.appendChild(filterTag)
            dateButton.appendChild(date)

            if (i.name.length > 10){
                name.innerText = i.name.slice(0,10)+"..."
            }else{
                name.innerText = i.name
            }

            mobile.innerText = i.mobile
            date.innerText = i.date
            status.innerText = i.status
            mobile.innerText = i.mobile

            details.appendChild(name)
            details.appendChild(mobile)
            details.appendChild(status)
            details.appendChild(dateButton)
            
            cards.appendChild(details)
            container.appendChild(cards);
            console.log(cards)
        }
    }
    componentDidMount(){
        this.displayCustomer()
    }
    render(){
        return(
            <div>
            <div id="statusBar">
                <div id="statusButton">
                  <button class="statusButton">ALL</button>
                  <button class="statusButton">ACTIVE</button>
                  <button class="statusButton">PENDING</button>
                  <button class="statusButton">INACTIVE</button>
                </div>
          
              </div>
          
              <hr id="statusBarEdge" />
          
              <div id="searchBarDiv">
                <div id="searchBar">
                  <img id="icon" src={require("../images/search.svg")} alt="eye icon"/>
                  <input type="text" id="searchField" />
                </div>
          
                <button>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L5 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M19 20L19 18" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M5 20L5 16" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M19 12L19 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M12 7L12 4" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <path d="M12 20L12 12" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <circle cx="5" cy="14" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <circle cx="12" cy="9" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                    <circle cx="19" cy="15" r="2" stroke="#6D7593" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
          
          
              <div id="labelBar">
          
                <div id="labels">
                  <button class="label">Name</button>
                  <p class="label">Mobile</p>
                  <p class="label">Status</p>
                  <button class="label">Added Date</button>
                </div>
          
              </div>
          
              <div class="scrolling-wrapperY" id="cardsList">
                
              </div>
            </div>
        )
    }
}
export default ContactsComp