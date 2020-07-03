const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes");

// Set up port and database to work with Heroku as well
var PORT = process.env.PORT || 3001;
const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

// Configure express app server
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets for production mode (on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to mongo database 
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

// Start the express app server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
