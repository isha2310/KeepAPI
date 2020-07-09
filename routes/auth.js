const express = require('express')
const {check } = require('express-validator')
const { signup, signin, signout } = require('../controller/auth')

const router = express.Router()

router.post('/signup',
[
    check('name', 'Username should be of minimum 3 characters.').isLength({min : 3}),
    check('password', 'Password should be of length 5.').isLength({min : 5, max : 5})
], 
signup 
)

router.post('/signin', [
    check('name', 'User name is required').isLength({min: 3}),
    check('password', 'Password name is required').isLength({min: 5, max: 5})
],
signin
)

router.get('/signout', signout)

module.exports = router