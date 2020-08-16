import React from 'react';
import axios from 'axios';

export const FetchCountries=()=> {
    debugger;
    return dispatch=>{
        
        return axios.get("http://13.57.235.126:5000/countries").then((Response)=>{
            dispatch({
                type:"FetchCountries",
                payload:Response.data
            })
        }).catch((error)=>{
            alert(error);
        })
    }
}


export const addCountry=(countryList,country_name)=> {
    debugger;
    return dispatch=>{
    return axios.get("http://13.57.235.126:5000/addcountry?name="+country_name).then((Response)=>{
          
            if(Response.status=="Success"){
            countryList = countryList.push({name:country_name})
            dispatch({
                type:"FetchCountries",
                payload:country_name
            })
        }
        }).catch((error)=>{
            alert(error);
        })
    }
    }

export const Increment =(dispatch,value)=>{
    debugger;
    dispatch({
        type:"Inc",
        payload:value
    })
}




