import React, {useState,useEffect} from 'react'
import axios from 'axios'
// import Weather from './Weather'
const App = () => {
  const [ country,setCountry ] = useState([]); 
  const [searchTerm,setSearchTerm] = useState("");
  const [weather,setWeather] = useState(null);

  useEffect(() => {
        axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
      console.log('promise fulfilled')
  }, [])
 
 const handleSearch = event => {
  setSearchTerm(event.target.value);
 //the event handler which syncronizes the change made to input with component state
};

     const val = country.filter(note => note.name.toLowerCase().includes(searchTerm.toLowerCase()))
     const showOnly = val.map(ans => <li key = {ans.name}>{ans.name}<button onClick={()=>{setSearchTerm(ans.name)}}>Show</button></li> )
     
     const val2 = val[0]
     useEffect(() => {
      const params = {
          access_key: process.env.REACT_APP_API_KEY,
          query: val2.capital
      };

      axios
          .get('http://api.weatherstack.com/current', {params})
          .then(response => setWeather(response.data.current));
  }, [val2]);

  return (
    <div>
      <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearch}
    />
     {/* if */}
     {val.length>10   ?  
    <p>Too many matches, specify another filter.</p>
     //else if
    :val.length===1 ?  
     <><h1>{val[0].name}</h1>
     <p>Capital: {val[0].capital}</p>
     <p>Population: {val[0].population}</p>
     <h2>Languages</h2>
     <ul>
         {
             val[0].languages.map(language => <li key={language.name}>{language.name}</li>)
         }
     </ul>
     <img src={val[0].flag} alt='flag' style={{width: 150, height: 150}} />
     <h2>Weather in {country.capital}</h2>
            {
                weather ?
                <>
                    <p>Temperature: {weather.temperature} celcius</p>
                    <img src={weather.weather_icons[0]} alt='Weather icon' />
                    <p>Wind: {weather.wind_speed} mph, direction {weather.wind_dir}</p>
                </>
                :
                <p>Loading weather data...</p>
            }
           </>
          //else
     : <ul><li>{showOnly} </li></ul>
      }
        </div>)}
  
export default App;
