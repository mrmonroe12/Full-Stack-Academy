import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import SearchBar from './components/SearchBar'
import PersonsList from  './components/PersonsList'
import Notification from './components/Notification'
import axios from 'axios'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Enter name...')
  const [newNumber, setNewNumber] = useState('Enter number...')
  const [searchFilter, setSearchFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  
  useEffect(()=>{
  	personsService
	  .getAll()
	  .then(
		  initialPersons => {
		  	setPersons(initialPersons)
		  }
	  )
  },[])

  const checkNameMatch = (personName) => {
  	return persons.some(
		(person) => person.name.toLowerCase() === personName.toLowerCase()
	)
	
  }
  
  
  const dispSuccessMessage = (type, personName) => {
  	setSuccessMessage(`${type} ${personName}`)
	setTimeout(()=>setSuccessMessage(null),4000)
  }
  
  const addName = (event) => {
  	event.preventDefault()
	const newPerson = {
		name: newName, number: newNumber
	}
	if (checkNameMatch(newName)){
		if (window.confirm(`${newName} already exists, update their number?`)){
			const id = persons.find(person=>person.name===newName).id
			personsService
				.update(id, newPerson)
				.then(returnedPerson=>{
					setPersons(persons.map(person=> person.id !== id ? person : returnedPerson))
					setNewName('')
					setNewNumber('')
					dispSuccessMessage('Updated',newName)
				})
		}			
	} else {
		
		personsService
			.create(newPerson)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
				dispSuccessMessage('Added', newName)
				
			})	
  		}
	}
  
  const handleNameChange = (event) => {
  	setNewName(event.target.value)
  }
  
  
  const handleNumberChange = (event) => {
  	setNewNumber(event.target.value)
  }
  
  const handleSearchFilter = (event) => {
  	setSearchFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={successMessage} />
	  <SearchBar searchFilter = {searchFilter} handleSearchFilter = {handleSearchFilter}/>				
	  <h2>Add New</h2>
	  <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
	  <PersonsList persons={persons} searchFilter={searchFilter} setPersons={setPersons}/>
    </div>
  )
}

export default App