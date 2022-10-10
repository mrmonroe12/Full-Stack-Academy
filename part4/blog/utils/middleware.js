const logger = require('./logger')
const morgan = require('morgan')

const requestLogger = () => morgan('tiny')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    
    next(error)
}

module.exports = { requestLogger, errorHandler }

