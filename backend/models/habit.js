const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    category: String,
    frequency: Number,
    target: Number,
    startDate: Date,
    endDate: Date,
    reminders: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    logs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Logs'
        }    
    ]
})

habitSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Habit', habitSchema)