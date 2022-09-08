import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import SearchBar from './components/SearchBar'
import PersonsList from  './components/PersonsList'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Enter name...')
  const [newNumber, setNewNumber] = useState('Enter number...')
  const [searchFilter, setSearchFilter] = useState('')
  
  useEffect(()=>{
  	axios
	  .get('http://localhost:3001/persons')
	  .then(
		  response => {
		  	setPersons(response.data)
		  }
	  )
  },[])

  const checkNameMatch = (personName) => {
  	return persons.some(
		(person) => person.name.toLowerCase() === personName.toLowerCase()
	)
	
  }
  const addName = (event) => {
  	event.preventDefault()
	if (checkNameMatch(newName)){
		alert(`${newName} already added!`)
	} else {
		setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
		setNewName('Enter name...')
		setNewNumber('Enter number... ')
		
	}
  }
  
  const handleNameChange = (event) => {
	console.log(event.target.value)
  	setNewName(event.target.value)
  }
  
  
  const handleNumberChange = (event) => {
	console.log(event.target.value)
  	setNewNumber(event.target.value)
  }
  
  const handleSearchFilter = (event) => {
	console.log(event.target.value)
  	setSearchFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
	  <SearchBar searchFilter = {searchFilter} handleSearchFilter = {handleSearchFilter}/>				
	  <h2>Add New</h2>
	  <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
	  <PersonsList persons={persons} searchFilter={searchFilter}/>
    </div>
  )
}

export default App