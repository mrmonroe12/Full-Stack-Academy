import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchBar = () => {
} 


const List = ({countries,filter}) => {
	
	const filteredCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(filter.toLowerCase())>=0)

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
	if (style === "compact"){
		return (<div>{country.name.common}</div>)
	} else if (style === "detail"){
		return (
			<div>
			<h2>{country.name.common}</h2>
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
	
	const handleSearchFilter = (event) => {
		trackSearchFilter(event.target.value)
	}
	
    useEffect(()=>{
    	axios
  	  .get('https://restcountries.com/v3.1/all')
  	  .then(response=>addCountries(response.data))},[])
	  
  return (
    <div>
	  <input value={searchFilter} onChange={handleSearchFilter}/>
	  <List countries={countries} filter = {searchFilter}/>
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