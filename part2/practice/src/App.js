import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
	

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)

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
				alert(
					`the note '${note.content}' was already deleted from the server`
				)
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