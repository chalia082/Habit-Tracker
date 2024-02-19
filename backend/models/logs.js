const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
    date: Date,
    status: Boolean,
    note: String,
    habits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit'
        }
    ]
})

logsSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Logs', logsSchema)