const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Note = require('./notes')

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
  },
  {timestamps: true}
)

userSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'userId'
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.authenticate = function(password) {
  if(bcrypt.compare(password, this.password))
    return true
  return false
}

module.exports = mongoose.model('User', userSchema)