const User = require('../models/user')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.signup = (req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(422).json({
            errors: error.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            res.status(400).json({
                error: 'Error saving user in DB'
            })
        } else {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            res.cookie('token', token, { expire: new Date() + 200 })
            const {_id, name} = user
            res.status(200).json({ token, user: { _id, name } })
        }
    })
}

exports.signin = (req, res) => {
    const error = validationResult(req)
    const { name , password } = req.body
    if(!error.isEmpty()) {
        return res.status(422).json({
            errors: error.array()[0].msg
        })
    }
    User.findOne({ name } , (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'Cannot find user in DB'
            })
        }
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Username and password do not match.'
            })
        }
        const token = jwt.sign({ _id: user._id}, process.env.SECRET)
        res.cookie('token', token, { expire: new Date() + 200 })
        const { _id, name } = user
        res.status(200).json({ token, user: { _id, name }})
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'Signed out successfully'
    })
}