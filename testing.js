fetch(`http://dev.api.vittae.money/broker/personal-info/5/`,{
        headers: {
          "Authorization":`Passcode 8421589623ba4487d92fbc545a35ce78d323fc3c`,
        "Content-type": "application/json; charset=UTF-8",
        'Connection':"keep-alive"}
      })
      .then(response=>{
        console.log(response)
        return response.json()
    })
      .then((data)=>{
        console.log(data)
      })