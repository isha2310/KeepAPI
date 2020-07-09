const express = require('express')
const router = express.Router()

const { getUserById, getUser, updatePin, isSignedIn, isAuthenticated } = require('../controller/user')

router.param('userId', getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser) 

router.patch('/user/:userId', isSignedIn, isAuthenticated, updatePin)

module.exports = router