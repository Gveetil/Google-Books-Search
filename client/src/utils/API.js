import axios from "axios";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_SEARCH_QUERY = "https://www.googleapis.com/books/v1/volumes"

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete(`/api/books/${id}`);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  // Executes the google books search for the given bookname and page start index
  searchBooks: function (bookName, startIndex) {
    return axios.get(GOOGLE_SEARCH_QUERY, {
      params: {
        "q": bookName,
        "startIndex": startIndex,
        "key": GOOGLE_API_KEY,
      },
    });
  },
};
