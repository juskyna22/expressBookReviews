const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/*express.post()is a method meant to serve the create requests to the serve. It has two parameters, first defines the end point and 
the second is a function taking the request-handler and the response handler*/

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username, "password":password});
      return res.status(200).json({message: "You are now part of the team. Log in and let the fun begin"});
    } else {
      return res.status(404).json({message: "You are already a premium member!"});
    }
  }
  return res.status(404).json({message: "Registration unavailable."});
});

/* express.get() is a method meant to serve the retrieve requests to the server. It has two parameters;first defines the end point and 
second is a function taking the request-handler and the response handler*/

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
  
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  based_author = req.params.author;
  booksarray = books;
  new_array = {};
  
  for(var key in booksarray) {
      if(booksarray.hasOwnProperty(key)) {
          var value = booksarray[key];
          if  (value["author"] == based_author) {
              new_array[key] = value;
          }

      }
  }
  res.send(new_array);
      
  });
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  based_title = req.params.title;
  booksarray = books;
  new_array = {};
  
  for(var key in booksarray) {
      if(booksarray.hasOwnProperty(key)) {
          var value = booksarray[key];
          if  (value["title"] == based_title) {
              new_array[key] = value;
          }

      }
  }
  res.send(new_array);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  based_isbn = req.params.isbn;
  booksarray = books;
  new_array = {};
  another_array = {};
  
  for(var key in booksarray) {
      if(booksarray.hasOwnProperty(key)) {
          var value = booksarray[key];
          if  (key == based_isbn) {
              new_array[key] = value;
          }
          another_array[key] = new_array["review"];

      }
  }
  res.send(another_array);

});

module.exports.general = public_users;

