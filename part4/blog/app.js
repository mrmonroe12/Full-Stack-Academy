const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI

logger.info('Attempting to connect to database')
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)


module.exports = app