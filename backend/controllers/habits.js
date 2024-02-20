const habitsRouter = require('express').Router()
const Habit = require('../models/habit')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

habitsRouter.get('/', async(req, res) => {
    const habits = await Habit.find({})
    res.json(habits)
})

habitsRouter.get('/:id', async(req, res) => {
    const habit = await Habit.findById(req.params.id)
    res.json(habit)
})
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log(authorization);
    if( authorization && authorization.startsWith('Bearer')) {
        console.log(authorization.replace('Bearer ', ''));
        return authorization.replace('Bearer ', '')
    }
    return null
}

habitsRouter.post('/', async(request, response) => {
    const body = request.body

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (!body.content) {
        return response.status(401).json({ error: 'missing content' })
    }

    const user = await User.findById(decodedToken.id)

    const habit = new Habit({
        title: body.title,
        description: body.description,
        category: body.category,
        frequency: body.frequency,
        target: body.target,
        startDate: body.startDate,
        endDate: body.endDate,
        reminders: body.reminders,
        user : user.id
    })

    const savedHabit = await habit.save()
    user.habits = user.habits.concat(savedHabit)
    await user.save()

    response.status(201).json(savedHabit)
})

habitsRouter.put('/:id', async(req, res) => {
    const { title } = req.body
    
    const updatedHabit = await Habit.findByIdAndUpdate(
        req.params.id,
        { title },
        { new: true, runValidators: true, context: 'query' }
    )
    res.status(201).json(updatedHabit)
})

habitsRouter.delete('/:id', async (req, res) => {
    await Habit.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = habitsRouter