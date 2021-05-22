const router = require('express').Router();
const fs = require('fs');
const notes = require("../db/db.json");
const {v4:uuidv4} = require('uuid')

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    notes.push(note);
    console.log(notes);
    fs.writeFile('../db/db.json', JSON.stringify(notes))
    res.redirect('/notes');
})

router.delete('/notes/:id', (req, res) => {
    notes.filter(note => note.id != req.params.id).then(updatedNotes => fs.writeFile('../db/db.json', JSON.stringify(updatedNotes)))
})



module.exports = router;
