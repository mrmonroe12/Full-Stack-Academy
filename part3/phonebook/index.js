require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const Person = require('./models/person')

morgan.token('body', function getBody (req) {
	return JSON.stringify(req.body)
})

const postlogger = morgan(':method :url :status :res[content-length] - :response-time ms :body', {skip: function (req,res) {return req.method !== 'POST'}})
const logger = morgan('tiny', {skip: function (req,res) {return req.method === 'POST'}})

app.use(logger)
app.use(postlogger)
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

/*let persons = [
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
]*/


const getRandomInt = max => Math.floor(Math.random() * max)

const personExists = personName => persons.some(person => person.name.toLowerCase() === personName.toLowerCase())



app.get('/api/persons', (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.statusMessage = 'Id not found'
				response.status(404).end()
			}
		})
		.catch(error => {
			next(error)
		})
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	/*
	if (!(body.name && body.number)) {
		return response.status(400).json({
			error: 'name and number required'
		})
	}*/
	/* TODO: Reimplement check for existing person
	if (personExists(body.name)) {
		return response.status(400).json({
			error: 'name must be unique (not case sensitive)'
		})
	} */
	
	const person = new Person({
		name: body.name,
		number: body.number,
		date: new Date(),
	})
	person.save()
		.then(savedPerson => response.json(savedPerson))
		.catch(error=>next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
		const {name, number} = request.body
		
		Person.findByIdAndUpdate(
			 request.params.id,
			 {name, number},
			 {new: true, runValidators: true, context: 'query'}
		)
		.then(updatedPerson => {
			if (updatedPerson) {
				response.json(updatedPerson)
			} else {
				return response.status(404).json({error: "Inconsistent Entry: Try Again"})
			}
		})
			.catch(error=> next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
		Person.findByIdAndRemove(request.params.id)
			.then(result => {
				if (result) response.status(204).end()
				else response.status(404).end()
			})
			.catch(error => next(error))
	})


app.get('/info', (request, response, next) => {
	Person.count()
		.then(result => {
			const numPersons = result
			const date = new Date()
	
			const content = 
			`
				<p>Phonebook has info for ${numPersons} people</p>
				<p>${date}</p>
			`
			response.send(content)	
		})
		.catch(error=>next(error))
	
})



const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.log('called error handler')
	
	if (error.name === 'CastError') {
		return response.status(400).send({error: 'Malformatted ID'})
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({error: error.message})
	}
	next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)
