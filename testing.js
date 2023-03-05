console.log('testing')

let today = new Date()
today.setMonth(1)
for(let dt = new Date(today.getFullYear(),today.getMonth(),1);dt< new Date(today.getFullYear(),today.getMonth()+1,0);dt.setDate(dt.getDate()+1)){
    console.log(dt.toDateString())
}
// console.log(dt)
//             dateDiv = document.createElement('div')
//             dateDiv.className = 'date'
//             dateDiv.name = i
//             dateDiv.onclick = this.getTasksPerDate
//             date = document.createElement('p')
//             date.id = 'date'
//             if (i == 1){
//              date.style.backgroundColor = '#223f80'
//              date.style.color = 'white'
//             }
//             day = document.createElement('p')
//             day.id = 'day'
//             remainder = document.createElement('P')
//             remainder.id = 'reminderOverlay'
//             remainder.innerText = '.'
//             let dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
//             day.innerText = dayName[dt.getDay()].slice(0,3)
//             date.innerText = dt.getDate() < 10?`0${dt.getDate()}`:dt.getDate();
//             dateDiv.append(day)
//             dateDiv.append(date)
//             dateDiv.append(remainder)

//             dates.appendChild(dateDiv)