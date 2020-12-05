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
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//default path for the homepage
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//get the information from the db.json
app.get("/api/notes", function(req, res) {
    res.json(db);
});

//take user input for notes and put it into the database
app.post("/api/notes"), function(req, res) {
    let notes = req.body;
    notes.id = db.length;
    
    console.log(notes)
    
    db.push(notes);

}


//delete note

//start server listening

