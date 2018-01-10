// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Star Wars Characters (DATA)
// =============================================================
var reservations = [
  {
    name: "Yoda",
    number: "714-758-0255",
    date: "01/29/2018",
    time: "19:30"
  }
];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});
// Get all reservations
app.get("/all", function(req, res) {
  res.json(reservations);
});
// Search for Specific reservation (or all reservations) - provides JSON
app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.reservations;
  if (chosen) {
    console.log(chosen);
    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});
// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  console.log(newReservation);
  reservations.push(newReservation);
  res.json(newReservation);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});