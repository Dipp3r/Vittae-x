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
          URL = e.target.getAttribute("value")
      }   
    
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