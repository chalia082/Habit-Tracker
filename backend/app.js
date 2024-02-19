require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Habit = require('./models/habit')
const habitsRouter = require('./controllers/habits')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    })

app.use(express.json())

app.use(middleware.requestLogger)
app.use(cors())


app.use('/api/habits', habitsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app