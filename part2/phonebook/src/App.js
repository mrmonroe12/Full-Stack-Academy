import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '816-330-8004'}
  ]) 
  const [newName, setNewName] = useState('Enter name...')
  const [newNumber, setNewNumber] = useState('Enter number...')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
		  {persons.map(person=><p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App