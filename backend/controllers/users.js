const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async(req, res) => {
    const users = await User.find({})
    .populate('habits', { title: 1, descripton: 1, category: 1 })
    res.json(users)
})

usersRouter.post('/', async(req, res) => {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    }) 

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

usersRouter.delete('/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = usersRouter