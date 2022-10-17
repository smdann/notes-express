// Required packages and files
const express = require('express');
const fs = require('fs');
const path = require('path');
const noteDatabase = require("./db/db.json");
const uuid = require("./helpers/uuid");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to homepage
app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Route to notes page
app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Get notes - API route
app.get("/api/notes", (req, res) => 
  res.json(noteDatabase)
);

// Save note - API route
app.post("/api/notes", (req, res) => {
  const fetchedNote = req.body
  const {title, text} = fetchedNote
  
  // Saves the new note object to the newNote const
  const newNote = {
    title,
    text,
    id: uuid(),
  };
  console.log(newNote)
  
  // Pushes the new note to the global noteDatabase array
  noteDatabase.push(newNote);
  console.log(noteDatabase)
  // Creates a stringified version to add to the db.json file
  const stringedNotesDB = JSON.stringify(noteDatabase);
  console.log(stringedNotesDB)
  // Writes the stringified note to the file
  fs.writeFile(path.join(__dirname, "/db/db.json"), stringedNotesDB, (err) => {
    if(err){
      res.status(400).json({msg: "There was an error saving your note."})
    } else {
      res.status(200).json({msg: "Your note was successfully saved."})
    }
  });
  
});

// Delete note - api/notes/:id
app.delete("/api/notes/:id", (req, res) => {
  const rawData = fs.readFileSync(path.join(__dirname, "/db/db.json"));
  const parsedData = JSON.parse(rawData)
  console.log("@@@@@", parsedData)
  const targetId = req.params.id;
  console.log(targetId)
  const filteredData = parsedData.filter(datum => datum.id !== targetId);
  console.log(filteredData)
  const stringedNotesDB = JSON.stringify(filteredData);
  console.log(stringedNotesDB)
  // Writes the stringified note to the file
  fs.writeFileSync(path.join(__dirname, "/db/db.json"), stringedNotesDB);
  const rawDataNew = fs.readFileSync(path.join(__dirname, "/db/db.json"));
  const parsedDataNew = JSON.parse(rawDataNew)
  res.json(parsedDataNew)

})




app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);