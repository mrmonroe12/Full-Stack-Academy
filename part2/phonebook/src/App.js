import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('Enter name...')
  const [newNumber, setNewNumber] = useState('Enter number...')
  const [searchFilter, setSearchFilter] = useState('')

  const checkNameMatch = (personName) => {
  	return persons.some(
		(person) => person.name === personName
	)
	
  }
  const addName = (event) => {
  	event.preventDefault()
	if (checkNameMatch(newName)){
		alert(`${newName} already added!`)
	} else {
		setPersons(persons.concat({name: newName, number: newNumber}))
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
	  <div>
	  	search by name containing: 
			<input
		value={searchFilter}
		onChange={handleSearchFilter}/>
	  </div>						
	  <h2>Add New</h2>
      <form>
        <div>
          name: <input 
	  				value={newName}
					onChange={handleNameChange}/>
        </div>
		<div>
		  number: <input 
					value={newNumber}
					onChange={handleNumberChange}/>
		</div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
		  {persons
			  .filter(person=>person.name.indexOf(searchFilter)>=0)
			  .map(person=><p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App