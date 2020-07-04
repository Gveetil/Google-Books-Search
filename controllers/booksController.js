const db = require("../models");

module.exports = {
  // Find all saved books
  findAll: async function (request, response) {
    try {
      const result = await db.Book
        .find({})
        .sort({ date: -1 });

      return response.json(result);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error.message);
    }
  },
  // Add new saved book
  create: async function (request, response) {
    try {
      const { title, subtitle, authors, description, image, googleLink } = request.body;
      const newBook = { title, subtitle, authors, description, image, googleLink };

      const result = await db.Book.create(newBook);

      const message = ` "${title}" added to book collection! `;
      notifyActiveConnections(request, message);

      return response.json(result);

    } catch (error) {
      console.log(error);
      if (error.keyValue.googleLink != null
        && error.name === "MongoError"
        && error.code === 11000) {
        // Check for validation errors
        return response.status(422).send('This book already exists in your collection!');
      }
      return response.status(500).send(error.message);
    }
  },
  // Delete saved book
  remove: async function (request, response) {
    try {
      const { id, title } = request.body;
      const result = await db.Book.deleteOne({ _id: id })
      if (result.deletedCount == 0) {
        return response.status(404).send("Book not found - Please refesh your list!");
      }
      const message = ` "${title}" was deleted from your book collection! `;
      notifyActiveConnections(request, message);
      return response.json(result);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error.message);
    }
  },
};

// Notify all clients of changes to booklist
function notifyActiveConnections(request, message) {
  try {
    const socketio = request.app.get('socketio');
    socketio.emit('broadcast', message)
  }
  catch (error) {
    // log errors and carry on if sockets fail
    console.log(error);
  }
}