//add dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");

//set up Express
var app = express();
var PORT = process.env.PORT || 3000;

//set up Express to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//send user to the notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//get the information from the db.json
app.get("/api/notes", function (req, res) {
    res.json(db);
});


//take user input for notes and put it into the database
app.post("/api/notes", function (req, res) {
  
    let notes = req.body;
    if (db.length) {
        notes.id = db[db.length - 1].id + 1
    } else {
        notes.id = 1
    };

   

    db.push(notes);

    //create file with note informatin
    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            console.log("success")
            res.sendStatus(200);
        }
    });
});


//delete note
app.delete('/api/notes/:id', function (req, res) {
    const noteDel = req.params.id;

    const deleteNote = db.findIndex(element => parseInt(element.id) === parseInt(noteDel));
    db.splice(deleteNote, 1);
    //rewrite file after item is deleted
    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            console.log("success")
            res.sendStatus(200);
        }
    });
});

//default path for the homepage
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
//start server listening
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});
