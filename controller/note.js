const Note = require('../models/notes')

exports.getNoteById = (req, res, next, noteId) => {
    Note.findById(noteId).exec((err, note) => {
        if(err || !note){
            return res.status(422).json({
                errors: 'Note not found'
            })
        }
        req.note = note
        next()
    })
}

exports.createNote = (req, res) => {
    const note = new Note({ ...req.body, userId: req.profile._id})
    note.save((err, note) => {
        if(err){
            return res.status(400).json({
                errors: 'Note cannot be created!'
            })
        }
        res.status(200).json({ note })
    })
}

exports.updateNote = (req, res) => {
    Note.findByIdAndUpdate(
        {_id: req.note._id},
        {$set: req.body},
        {new: true},
        (err, note) => {
            if(err){
                return res.status(422).json({
                    errors: 'Cannot update the note.'
                })
            }
            res.json({note})
        }
    )
}

exports.getNote = (req, res) => {
    res.json(req.note)
}

exports.getAllNotes = async(req, res) => {
    try {
        await req.profile.populate( 'notes').execPopulate()
        res.send(req.profile.notes)
    } catch (e) {
        res.status(500).send()
    }
}

exports.removeNote = (req, res) => {
    const note = req.note
    note.remove((err, msg) => {
        if(err) {
            return res.status(400).json({
                errors: 'Cannot remove the note'
            })
        }
        res.json({
            message: 'Note removed!'
        })
    })
}