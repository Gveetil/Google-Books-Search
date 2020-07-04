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
      return response.json(result);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error.message);
    }
  },
  // Delete saved book
  remove: async function (request, response) {
    try {
      const result = await db.Book.deleteOne({ _id: request.params.id })
      return response.json(result);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error.message);
    }
  }
};