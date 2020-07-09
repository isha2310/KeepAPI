const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        note: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId , 
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Note', noteSchema)