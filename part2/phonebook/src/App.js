import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('Add a name...')

  const addName = (event) => {
  	event.preventDefault()
	  setPersons(persons.concat({name: newName}))
	setNewName('Add another name...')
  }
  
  const handleNameChange = (event) => {
	console.log(event.target.value)
  	setNewName(event.target.value)
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
          <button type="submit" onClick={addName}>add</button>
        </div>
	  	<div>
		  debug: {newName}
	  	</div>
      </form>
      <h2>Numbers</h2>
		  {persons.map(person=><p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App