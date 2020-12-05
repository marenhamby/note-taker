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

//take user input for notes and put it into the database

//delete note

//start server listening

