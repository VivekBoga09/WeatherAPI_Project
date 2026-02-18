 import React from 'react'


function CurrentWeatherCard(props) {
    console.log(props)
  return (
    <div className='card'>
       <h2 className='text-black citytext'> {props.city}</h2>
        <h1 className='text-danger'>{props.currentweather.main.temp}°C</h1>
        <h3>{props.currentweather.weather[0].description}</h3>
       <img className='image' src={`https://openweathermap.org/img/wn/${props.currentweather.weather[0].icon}@2x.png`} alt="weather icon" style={{ width: '100px', height: '100px' ,margin:'auto'}}/>

        <p>Feels like: {props.currentweather.main.feels_like}°C</p>
        <p>Humidity:  {props.currentweather.main.humidity}%</p>
        <p>Wind Speed : {props.currentweather.wind.speed}m/s</p>
    
       
    
    </div>
  )
}

export default CurrentWeatherCard 


