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

habitsRouter.post('/', async(req, res) => {
    const body = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!body.content) {
        return res.status(400).json({ error: 'missing content' })
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

    res.status(201).json(savedHabit)
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


module.exports = habitsRouter