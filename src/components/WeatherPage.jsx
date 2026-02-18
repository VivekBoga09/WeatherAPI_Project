import React from 'react'
import SearchBar from './SearchBar'
import ForecastDay from './ForecastDay'
import CurrentWeatherCard from './CurrentWeatherCard'
import {useState,useEffect} from 'react'


function WeatherPage() {

               const [currentweather,setcurrentweather]=useState(null)
               const [error,seterror]=useState(null)
               const [forecast,setforecast]=useState(null)
               const [loading,setloading]=useState(false)
               const [city,setcity]=useState(null)
               


        const apikey = import.meta.env.VITE_WEATHER_API_KEY;
        console.log(import.meta.env);



        function searchcity(newcity)
        {
            if(newcity!=null)
            {
                setcity(newcity)
                setforecast(null)
                setcurrentweather(null)
                seterror(null)
            }
        }

    function currentLocation()
    {
            if (!navigator.geolocation) {
            seterror("Geolocation not supported");
            return;
            }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
          );
          const data = await response.json();
          setcity(data.name); 
        } catch (err) {
          seterror("Failed to fetch weather");
        }
      },
      () => {
        seterror("Location permission denied");
      }
    );
        }


        const fetchdata=async()=>
        {
            setcurrentweather(null)
            setforecast(null)

            setloading(true)
            seterror(null)
                try{

                    const currweatherRes=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
                     const currweatherResObj=await currweatherRes.json()
                      if (currweatherResObj.cod !== 200) {
                            throw new Error("City not found");
                              }
                             
                    const forecastRes=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`)
                          const forecastResObj=await forecastRes.json() 
                        if (Number(forecastResObj.cod) !== 200) {
                              throw new Error("City not found");
                                  }
                     
                    
                   
                    setforecast(forecastResObj)
                    setcurrentweather(currweatherResObj)

                   

                }
                catch(err)
                {
                    seterror(err.message)
                    setforecast(null)
                    setcurrentweather(null)
                    
                }
                finally{
                    setloading(false)

                }
        }
         useEffect(()=>{
                       currentLocation()
        },[])

       

        useEffect(()=>{
            if(city)
            {
                         fetchdata()
            }
        },[city])


  return (
       


 <div className='weather-page'>
       <h1 className='text-center text-warning topname'>ClimateV</h1>

    {loading && (
      <div className="spinner">
        <h3>Loading weather data...</h3>
      </div>
    )}

    <SearchBar searchcity={searchcity} />
    {error && !loading && (
   <div className="error-message">
      <p className='text-danger text-center'>{error}</p>
   </div>
)}


    {!loading && currentweather && (
      <CurrentWeatherCard 
        currentweather={currentweather} 
        city={city} 
      />
    )}

    {!loading && forecast && (
      <div className='d-flex overflow-x-auto'>
        {forecast.list.map((fobj, index) => (
          <ForecastDay key={index} data={fobj} />
        ))}
      </div>
    )}

  <footer className="footer">
  <p>© {new Date().getFullYear()} ClimateV • Built by Vivek Boga</p>
  <p className="footer-sub">
    Powered by OpenWeather API
  </p>
</footer>


  </div>
  )
}

export default WeatherPage 
