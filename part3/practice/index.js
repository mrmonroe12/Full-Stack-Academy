require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Note = require('./models/note')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

/*let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]
 */

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
	.then(note => {
		if (note) {
			response.json(note)
		} else {
			response.statusMessage = 'ID not found'
			response.status(404).end()
		}	
  	})
	.catch(err => next(err))
})

/*
const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map(n=>n.id)) : 0
	return maxId + 1
}
*/

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
	Note.findByIdAndRemove(request.params.id)
		.then(result => response.status(204).end())
		.catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	
	if (error.name === 'CastError') {
		return reponse.status(400).send({error: 'Malformatted ID'})
	}
	
	next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)