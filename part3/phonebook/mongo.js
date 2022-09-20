const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide password as an argument: node mongo.js <password>')
	process.exit(1)
} else if (process.argv.length === 4) {
	console.log('To add entry, please provide name number: node mongo.js <password> <name> <number>')
	process.exit(1)
}
const password = process.argv[2]
const runType = process.argv.length === 3 ? 'getAll' : 'addEntry'
const entryName = process.argv[3]
const entryNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.sl57v6c.mongodb.net/phoneApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	date: Date,
})

const Person = mongoose.model('Person', personSchema)

mongoose
	.connect(url)
	.then((result) => {
		console.log('connected')
		if (runType==='addEntry') {
			const person = new Person({
				name: entryName,
				number: entryNumber,
				date: new Date(),
			})
			console.log(`Added ${entryName} number ${entryNumber} to phonebook`)
			return person.save()
		} else if (runType === 'getAll') {
			console.log('phonebook:')
			Person.find({}).then(result => {
				result.forEach(person => {
					console.log(`${person.name} ${person.number}`)
				})
			
			})
			
		}
	})
	.then(() => {
		return mongoose.connection.close()
	})
	.catch((err) => console.log(err))