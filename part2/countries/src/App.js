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
  	  .then(response=>addCountries(response.data),()=>console.log("p1 failed"))
	  .then(()=>console.log("Am I doing this?"),()=>console.log("p2 failed"))
	  .then(updateFilteredCountries(countries
			.map(country=> {
				const addView = {}
				
				addView.country = country
				addView.view = "compact"
				return addView
			}
	  )),()=>console.log("p3 failed"))
  	  .then(()=>console.log("How about this?")
  	  )},[])
			  
  
	  
  return (
    <div>
	  <input value={searchFilter} onChange={handleSearchFilter}/>
	  <List countries={countries} filteredCountries = {filteredCountries}/>
    </div>
  )
}

export default App;


/*
			<ul>{Object.entries(country.languages)				
				.map(language=>
						<li key={language[0]}>{language[1]}</li>
				)}
			</ul>
*/