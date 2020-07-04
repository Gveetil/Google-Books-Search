const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: mongoose.Schema.Types.String,
  subtitle: mongoose.Schema.Types.String,
  authors: [{
    type: mongoose.Schema.Types.String,
    _id: false
  }],
  description: mongoose.Schema.Types.String,
  image: mongoose.Schema.Types.String,
  googleLink: {
    type: mongoose.Schema.Types.String,
    unique: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
