const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (req, res) => {
    console.log('error: Unknown endpoint');
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformated id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = null
    }

    next()
}


module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor }