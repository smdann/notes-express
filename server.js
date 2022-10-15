// Required packages and files
const express = require('express');
const fs = require('fs');
const path = require('path');

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

// Get notes - API 


// Save note - API


// Delete note - API





app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);