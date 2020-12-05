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

//get the information from the db.json
app.get("/api/notes", function(req, res) {
    res.json(db);
});

//default path for the homepage
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//take user input for notes and put it into the database
app.post("/api/notes"), function(req, res) {
    var notes = req.body
    notes.id = db.length
    
    console.log(notes)
    
    db.push(notes);

    //create file with note informatin
    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
        if (err) {
            console.log("error");
        } else{
            console.log("success")
        }        
    });
};


//delete note
app.delete('/api/notes/:id', function(req, res){
    const noteDel = req.params.id;

    for (var i=0; i<db.length; i++) {
        if (noteDel === notes.id) {
            db.splice([i], 1);
            res.json(db);
        };
    };
});

//start server listening
app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
});
