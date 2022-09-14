import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import './index.css'
	

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		}
		noteService
			.create(noteObject)
			.then(response => {
				setNotes(notes.concat(response.data))
				setNewNote('')
			})
		
	}
	
	const toggleImportanceOf = (id) => {
		const url = `http://localhost:3001/notes/${id}`
		const note = notes.find(n => n.id === id)
		const changedNote = {...note, important: !note.important}
		
		noteService
			.update(id, changedNote)
			.then(response=> {
				setNotes(notes.map(n => n.id !== id ? n :response.data))
			})
			.catch(error => {
				setErrorMessage(
					`the note '${note.content}' was already deleted from the server`
				)
				setTimeout(()=>setErrorMessage(null),5000)
				setNotes(notes.filter(n => n.id !== id))
			})
		
	}
	
	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	useEffect(() => {
	    noteService
			.getAll()
	      	.then(response => {
	        	setNotes(response.data)
	      })
	  },[])

	return (
	<div>
	  <h1>Notes</h1>
	  <Notification message={errorMessage} />
	  <ul>
	    {notes.map(note => 
			<Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)}/>
		)}
	  </ul>
	  <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
		
	</div>
	)
	}

export default App