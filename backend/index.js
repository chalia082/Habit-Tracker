require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Habit = require('./models/habit')
const habitsRouter = require('./controllers/habits')
const middleware = require('./utils/middleware')

app.use(express.json())

app.use(middleware.requestLogger)
app.use(cors())


app.use('/api/habits', habitsRouter)

app.post('/api/habits', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }

    const habit = new Habit({
        content: body.content
    })

    habit.save().then(savedHabit => {
        res.json(savedHabit)
    })
    .catch(error => next(error))
})



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
