let data = [
    {
      id: 0,
      customer_id: 421,
      broker_id: 391,
      title: 'rgdrgdrg                                                                                            ',
      body: 'gdrgdrgd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ',
      date: '2023-04-05T18:03:00.000Z',
      outcome: null,
      completed: false
    },
    {
      id: 1,
      customer_id: 421,
      broker_id: 391,
      title: 'tfyfyhg                                                                                             ',
      body: 'uguut                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ',
      date: '2023-04-03T14:01:00.000Z',
      outcome: null,
      completed: false
    }
  ]
  let today = new Date()
  let tempdata = data
  let arr = []
  for(let dt = new Date(today.getFullYear(),today.getMonth(),1);dt< new Date(today.getFullYear(),today.getMonth()+1,0);dt.setDate(dt.getDate()+1)){
    let obj = {}
    obj.date = dt
    obj.tasks = []
    for(let i = 0;i<tempdata.length;i++){
        if(dt.toDateString() == new Date(tempdata[i].date).toDateString()){
            obj.tasks.push(tempdata[i])
            tempdata.splice(i,1)
        }
    }
    if (obj.tasks.length > 0) arr.push(obj)
  }
 
