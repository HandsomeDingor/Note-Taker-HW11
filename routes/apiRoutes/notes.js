const router = require('express').Router();
const notes = require('../../db/db.json');

var fs = require("fs");

router.get('/notes', (req, res) => {
    res.json(notes);
});

// API POST Request
router.post("/notes", (req, res) =>{
    const newNote = req.body;
    // id number start form "1"
    newNote.id = notes.length + 1;
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function () {
        res.json(notes);
    });
});

// // API DELETE Request
router.delete("/notes/:id",(req, res) =>{
    var id = req.params.id;
    //console.log(id);
    // Use splice to delete the selected note from the db array
    notes.splice(id - 1, 1);
    // console.log(notes[1].id);

    for (i=1; i < notes.length+1; i++){
        // re-assign the order
        notes[i-1].id = i;
        // console.log(i);
        // console.log(notes[1].id);
        // console.log(notes);
    };

    fs.writeFile("./db/db.json", JSON.stringify(notes), function () {
        res.json(notes);
    });
});

module.exports = router;