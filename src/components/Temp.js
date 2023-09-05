import React, { useEffect, useState } from 'react'
import './style.css'
import Weathercard from './weathercard';

const Temp = () => {

    const [searchvalue,setSearchValue]=useState("Pune");
    const [tempInfo,setTempInfo]=useState({});

    const getWeatherInfo=async ()=>{
        try{
            let api_key="9d7884cfea3dfab492718b948eb8dce1"
            let url=
            `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=${api_key}`

            const res=await fetch(url);
            const data=await res.json()

            const {temp,humidity,pressure}=data.main;
            const{main:weathermood}=data.weather[0]
            const {name}=data
            const {speed}=data.wind
            const {country,sunset}=data.sys
            

            const myNewWeatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,sunset,
            }

            setTempInfo(myNewWeatherInfo)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getWeatherInfo()
    },[]);
    

  return (
    <>
        <div className='wrap'>
            <div className='search'>
                <input type="search" 
                placeholder='search'
                autoFocus
                id='search'
                className='searchTerm'
                value={searchvalue}
                onChange={(e)=>setSearchValue(e.target.value)}
                />

                <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>
        
        <Weathercard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp