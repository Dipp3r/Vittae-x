import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WithRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    var changeRoute= (e) =>{
      var URL = ''
      if (typeof(e) == 'string'){
        URL = e
      }else{
        URL = e.currentTarget.getAttribute("value")
        console.log(e.currentTarget)
        if(URL == null) URL = e.target.value
      }   
      console.log(URL)
      navigate(URL)
    }
    return (
      <Component
        navigate={changeRoute}
        {...props}
        />
    );
  };
  
  return Wrapper;
}