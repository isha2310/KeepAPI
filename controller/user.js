const User =  require('../models/user')
const expressJwt = require('express-jwt')

exports.getUserById = (req, res, next, userId) => {
    User.findById(userId).exec((err, user) => {
        if(err || !user) {
            return res.status(422).json({
                error: 'Cannot find the user'
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    req.profile.password = undefined
    res.status(200).json(req.profile)
}

exports.updatePin = (req, res) => {
    const user = req.profile
    user.password = req.body.password
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: 'Failed to update'
            })
        }
        res.status(200).json('Pin updated')
    })
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET ,
    userProperty: 'auth' 
})

exports.isAuthenticated = (req, res, next) => {
    let authenticated = req.profile && req.auth && req.profile._id == req.auth._id
    if(!authenticated){
        return res.status(400).json({
            error: 'ACCESS DENIED'
        })
    }
    next()
}