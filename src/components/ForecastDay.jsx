import React from 'react'

function ForecastDay({data}) {
  return (
    <div className=''>
        <p>{data.dt_txt}</p>
       <img  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" style={{ width: '100px', height: '100px' }}/>
       <h5>{data.main.temp}</h5>
    </div>
  )
}

export default ForecastDay 



