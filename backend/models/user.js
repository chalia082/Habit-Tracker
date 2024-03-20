const mongoose = require('mongoose')
const unqiueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minLength: 3,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
        minLength: 5
    }, 
    email: { 
        type: String
    },
    createdAt: Date,
    habits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(unqiueValidator)
module.exports = mongoose.model('User', userSchema)