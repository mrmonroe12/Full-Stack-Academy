const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getRandomInt = max => Math.floor(Math.random() * max)

const personExists = personName => persons.some(person => person.name.toLowerCase() === personName.toLowerCase())

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person=> person.id === id)
	
	if (person) {
		response.json(person)
	} else {
		response.statusMessage = 'Id not found'
		response.status(404).end()
	}
	
})

app.post('/api/persons', (request, response) => {
	const body = request.body
	const id = getRandomInt(1000000000)
	
	if (!(body.name && body.number)) {
		return response.status(400).json({
			error: 'name and number required'
		})
	}

	if (personExists(body.name)) {
		return response.status(400).json({
			error: 'name must be unique (not case sensitive)'
		})
	}
	
	const person = {
		id: id,
		name: body.name,
		number: body.number
	}
	persons = persons.concat(person)
	response.json(person)
	
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person=> person.id === id)
	
	if (person) {
		persons = persons.filter(person => person.id !== id)
		response.status(204).end()
	} else {
		response.statusMessage = 'Id not found'
		response.status(404).end()
	}
	
})

app.get('/info', (request, response) => {
	const numPersons = persons.length
	const date = new Date()
	
	const content = 
		`
			<p>Phonebook has info for ${numPersons} people</p>
			<p>${date}</p>
		`
	response.send(content)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)