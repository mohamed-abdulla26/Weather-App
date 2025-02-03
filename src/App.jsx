 import SEARCH from './assets/search.png';
 import SNOW from './assets/snw.png'
 import CLEAR from './assets/sun.png'
 import FEW_CLOUD from './assets/few-cloud.png'
 import SCATTER from './assets/scatter.webp'
 import BROKEN_CLOUD from './assets/cld.png'
 import DRIZZLE from './assets/drzl.png'
 import RAIN from './assets/rain.webp'
 import THUNDER from './assets/thunder.png'
 
 import HUMIDITY from './assets/humidity.png';
 import WIND from './assets/sand.webp';


import './App.css'
import { useState } from 'react';
function WeatherDetails({img ,city,cel,country,lat,lon,humi,wind}){

  return(
    <>
     <div className="weather-image">
      <img src={img} alt="climate image" />
     </div>
     <div className="city">
     <h3>{city}</h3>
     </div>
     <div className="celsius">
      <span>{cel}<sup>o</sup></span><span>C</span>
     </div>
     
     <div className="country">
      <h4>{country}</h4>
     </div>
     <div className="cord">
      <div className="lat">
        <p>lattitude</p>
        <span>{lat}</span>
      </div>
      <div className="lon">
        <p>longitude</p>
        <span>{lon}</span>
      </div>
     </div>
     <div className="wind-and-humidity">
      <div className="humidity">
        <p>humidity</p>
        <img src={HUMIDITY} alt="humidity" />
        <span>{humi}%</span>
      </div>
      <div className="wind">
        <p>wind</p>
        <img src={WIND} alt="wind" />
        <span>{wind}km/h</span>
      </div>
     </div>
     
     
    </>
  )
}
function App() {
  const KEY="e53e3ac1f9d98f1f4e0ba73d5a5deb9d"
  const[text,setText]=useState("")
  const[img,setImg]=useState()
  const[city,setCity]=useState("")
  const[cel,setCel]=useState(0)
  const[country,setCountry]=useState("")
  const[lat,setlat]=useState()
  const[lon,setlon]=useState()
  const[humi,setHumi]=useState()
  const[wind,setWind]=useState()
  const[loading,setLoading]=useState(false)
  const[cityNotFound,setCityNotFound]=useState(false)
  
 const weatherIcon ={
  "01d":CLEAR,
  "01n":CLEAR,
  "02d":FEW_CLOUD,
  "02n":FEW_CLOUD,
  "03d":SCATTER,
  "03n":SCATTER,
  "04d":BROKEN_CLOUD,
  "04n":BROKEN_CLOUD,
  "09d":DRIZZLE,
  "09n":DRIZZLE,
  "10d":RAIN,
  "10n":RAIN,
  "11d":THUNDER,
  "11n":THUNDER,
  "13d":SNOW,
  "13n":SNOW
  
  
}

  const handleText=(e)=>{
   setText(e.target.value)
  }
  const search= async()=>{
    setLoading(true)
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${KEY}&units=metric`
    const res=await fetch(URL)
    const data=await res.json()
    
    try{
     if(data.cod==="404"){
      console.log('data not found',data.error)
     
      setCityNotFound(true)
      setLoading(false)
      return
     }
     setCity(data.name)
     setCel(Math.floor(data.main.temp))
     setCountry(data.sys.country)
     setlat(data.coord.lat)
     setlon(data.coord.lon)
     setHumi(data.main.humidity)
     setWind(data.wind.speed)
     const weathercode=data.weather[0].icon
     setImg(weatherIcon[weathercode] || CLEAR)
     setCityNotFound(false)
    }catch(error){
     console.log("erroe:",error.message)
    }
    finally{
      setLoading(false)
      
    }
    
  }
  const handledata=(e)=>{
    if(e.key==="Enter"){
      search()
    }
  }
  return (
    <div className="container">
      <div className="dataInput">
        <input type="text" placeholder='Enter the city' onChange={handleText} onKeyDown={handledata} />
        <div className="search">
          <img src={SEARCH} alt="serach" onClick={search}/>
        </div>
      

      </div>

      {!loading&&!cityNotFound && <WeatherDetails img={img} city={city} cel={cel} country={country} lat={lat} lon={lon} humi={humi} wind={wind} />}
    <div className="msg">
    {loading&& <p>Loading...</p>}
    {cityNotFound&& <p>City Not Found !</p>}
    </div>
    </div>
  )
}

export default App
