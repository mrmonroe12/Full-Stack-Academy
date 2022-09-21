const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]
const message = process.argv[3]

const url = `mongodb+srv://fullstack:${password}@cluster0.sl57v6c.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
	.connect(url)
	.then((result) => {
		/*console.log('connected')
		
		const note = new Note({
			content: message ? message : "Blank Message",
			date: new Date(),
			important: true,
		})
	
	return note.save()*/
		Note.find({}).then(result => {
			result.forEach(note => {
				console.log(note)
			})
		})
			.then(console.log('notes printed!'))
	})
	.then(() => {
		console.log('closeing connection!')
		return mongoose.connection.close()
	})
	.catch((err) => console.log(err))