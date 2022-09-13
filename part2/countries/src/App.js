import { useState, useEffect } from 'react'
import axios from 'axios'



const List = ({countries,filteredCountries}) => {
	
	if (filteredCountries.length === 0) {
		return (
			<div>no matching countries</div>
		)
	}
	
	 else if (filteredCountries.length === 1){
		 return (
			 <div>{filteredCountries
				 	.map(country =>
						<ListRow key={country.name.official} country={country} style="detail"/>)}
			</div>
	)} else if (filteredCountries.length < 10){
		 return (
			 <div>{filteredCountries
				 	.map(country =>
						<ListRow key={country.name.official} country={country} style="compact"/>)}
			</div>
	)}
	else return <div>Too many matches, specify another filter</div>

}

const Weather = ({city, latlng}) => {
	const api_key = process.env.REACT_APP_API_KEY
	const tempConv = inTemp => ((inTemp-273.15)*9/5+32).toPrecision(3)
	const windSpeedConv = inSpeed => (inSpeed*2.23694).toPrecision(3)
	
	const [weather, updateWeather] = useState({})
	useEffect(()=> {
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`)
			.then(response=>updateWeather(response.data),()=>console.log('Failed to get weather'))	
		}
		,[])
		
		if (typeof weather.main != 'undefined'){
	return (
		<div>
			<h3>Current Weather in {city}</h3>
			<p>Temperature is {tempConv(weather.main.temp)} Fahrenheit</p>
		<p>Conditions are {weather.weather[0].main}</p>
		<p>Wind speed is {windSpeedConv(weather.wind.speed)} mph</p>
		</div>
	)}
	else return (
		<div>
		</div>
	)
}

const ListRow = ({country, style}) => {
	
	const [viewState, toggleViewState] = useState(style)
	const showClickHandler = (event) => {
		event.preventDefault()
		if (viewState==="compact") toggleViewState("detail")
		else toggleViewState("compact")
	}
	
	useEffect(() => {
		toggleViewState(style)
	},[style])
	
	if (viewState === "compact"){
		return (
			<div>{country.name.common}<button onClick={showClickHandler}>expand collapse</button></div>
		)
	} else if (viewState === "detail"){
		return (
			<div>
			<h2>{country.name.common}</h2><button onClick={showClickHandler}>expand collapse</button>
			<br/>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<br/>
			<h3>languages:</h3>
			<ul>{Object.entries(country.languages)				
				.map(language=>
						<li key={language[0]}>{language[1]}</li>
				)}
			</ul>
			<br/>
			<img src ={country.flags.png} />
			<Weather city={country.capital[0]} latlng = {country.capitalInfo.latlng}/>
			</div>
		)
	}
}



const App = () => {
	
	const [countries, addCountries] = useState([])
	const [searchFilter, trackSearchFilter] = useState("")
	const [filteredCountries, updateFilteredCountries] = useState([])
	const handleSearchFilter = (event) => {
		trackSearchFilter(event.target.value)
		updateFilteredCountries(countries
			.filter(country => 
				country.name.common.toLowerCase()
				.indexOf(event.target.value.toLowerCase())>=0))
	}
	
	
    useEffect(()=>{
    	axios
  	  .get('https://restcountries.com/v3.1/all')
  	  .then(response=>addCountries(response.data),()=>console.log("Failed to get countries"))
  	  },[])
			  
  
	  
  return (
    <div>
	  <input value={searchFilter} onChange={handleSearchFilter}/>
	  <List countries={countries} filteredCountries = {filteredCountries}/>
    </div>
  )
}

export default App;
