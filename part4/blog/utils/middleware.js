const logger = require('./logger')
const morgan = require('morgan')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = () => morgan('tiny')

const errorHandler = (error, request, response, next) => {

    
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({
            error: 'invalid token'
        })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(400).json({
            error: 'token expired, reauthenticate'
        })
    }
    
    logger.error(error.message)    
    next(error)
}

const tokenExtractor = (request, response) => {
    const getTokenFrom = request => {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            return authorization.substring(7)
        } return null
    }
    const token = getTokenFrom(request)
    request.token = token
}

const userExtractor = async (request, response, next) => {
    await tokenExtractor(request, response, next)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}


module.exports = { requestLogger, errorHandler, tokenExtractor, userExtractor }

