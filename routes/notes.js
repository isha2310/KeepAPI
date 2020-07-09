const express = require('express')
const router = express.Router()
const { getUserById, isSignedIn, isAuthenticated } = require('../controller/user')
const { getNoteById, createNote, updateNote, removeNote, getAllNotes, getNote } = require('../controller/note')

router.param('userId', getUserById)
router.param('noteId', getNoteById)

router.post('/createNote/:userId', isSignedIn, isAuthenticated, createNote)

router.patch('/updateNote/:userId/:noteId', isSignedIn, isAuthenticated, updateNote)

router.get('/getNote/:userId/:noteId', isSignedIn, isAuthenticated, getNote)

router.get('/getNotes/:userId', isSignedIn, isAuthenticated, getAllNotes)

router.delete('/removeNote/:userId/:noteId', isSignedIn, isAuthenticated, removeNote)

module.exports = router