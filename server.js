const express = require("express");

// Set up port to work with Heroku as well
var PORT = process.env.PORT || 3001;
const app = express();

// Configure express app server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets for production mode (on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Start the express app server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
