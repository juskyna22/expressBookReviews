const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


/*express.post()is a method meant to serve the create requests to the serve. It has two parameters, first defines the end point and 
the second is a function taking the request-handler and the response handler*/

public_users.post("/register", (req,res) => {
  //Write your code here
    res.status(300).json({message: "Yet to be implemented"});
});

/* express.get() is a method meant to serve the retrieve requests to the server. It has two parameters;first defines the end point and 
second is a function taking the request-handler and the response handler*/

// Get the book list available in the shop
public_users.get('/',(req, res) => {
  //Write your code here
   res.send(books);
  //Previous code: return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  res.send(books[author])
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  res.send(books[title])
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn].review)
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
