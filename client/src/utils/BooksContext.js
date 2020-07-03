import React from "react";

const BooksContext = React.createContext({
  bookList: [],
  supportedAction: {
    type: "",
    icon: "",
    handler: (book) => { },
  },
  userMessage: "",
  hasMoreBooks: false,
  loadNextPage: () => { },
});

export default BooksContext;
