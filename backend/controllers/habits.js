const habitsRouter = require('express').Router()
const Habit = require('../models/habit')

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

    if (!body.content) {
        return res.status(400).json({ error: 'missing content' })
    }

    const habit = new Habit({
        content: body.content
    })

    const savedHabit = await habit.save()

    res.status(201).json(savedHabit)
})

habitsRouter.put('/:id', async(req, res) => {
    const { content } = req.body
    
    const updatedHabit = await Habit.findByIdAndUpdate(
        req.params.id,
        { content },
        { new: true, runValidators: true, context: 'query' }
    )
    res.status(201).json(updatedHabit)
})


module.exports = habitsRouter