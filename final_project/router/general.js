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
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 const isbn = req.params.isbn;
  booksCollection = books;
  newCollection = {};
  
  for(var key in booksCollection) {
      if(booksCollection.hasOwnProperty(key)) {
          var value = booksCollection[key];
          if  (value["isbn"] == (isbn)) {
              newCollection[key] = value;
          }

      }
  }
  res.send(newCollection);
  
  
 });

//Get book details based on ISBN with callback and promises
public_users.get('/books/isbn/:isbn',function (req, res) {

    const findBooksByisbn = new Promise((resolve, reject) => {

    let byisbn = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        byisbn.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({byisbn}, null, 4)));
      }


    });
    reject(res.send("The ISBN is lost in a different place and doesn't exist here "))
        
    });

    findBooksByisbn.then(function(){
            console.log("Promise is is fullfilled");
   }).catch(function () { 
                console.log('The ISBN is lost in a different place and doesn't exist here');
  });

  });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  byAuthor = req.params.author;
  booksCollection = books;
  newCollection = {};
  
  for(var key in booksCollection) {
      if(booksCollection.hasOwnProperty(key)) {
          var value = booksCollection[key];
          if  (value["author"] == byAuthor) {
              newCollection[key] = value;
          }

      }
  }
  res.send(newCollection);
      
  });
//Get book details based on author with call back and promises
public_users.get('/books/author/:author',function (req, res) {

    const findBooksByAuthor = new Promise((resolve, reject) => {

    let byAuthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        byAuthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({byAuthor}, null, 4)));
      }


    });
    reject(res.send("The author is lost in a different place and doesn't exist here "))
        
    });

    findBooksByAuthor.then(function(){
            console.log("Promise is is fullfilled");
   }).catch(function () { 
                console.log('The author is lost in a different place and doesn't exist here');
  });

  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  byTitle = req.params.title;
  booksCollection = books;
  newCollection = {};
  
  for(var key in booksCollection) {
      if(booksCollection.hasOwnProperty(key)) {
          var value = booksCollection[key];
          if  (value["title"] == byTitle) {
              newCollection[key] = value;
          }

      }
  }
  res.send(newCollection);
});

//Get all books based on title with callback

public_users.get('/books/title/:title',function (req, res) {

    const findBooksByAuthor = new Promise((resolve, reject) => {

    let byAuthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        byAuthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({byAuthor}, null, 4)));
      }


    });
    reject(res.send("The author is lost in a different place and doesn't exist here "))
        
    });

    findBooksByAuthor.then(function(){
            console.log("Promise is is fullfilled");
   }).catch(function () { 
                console.log('The author is lost in a different place and doesn't exist here');
  });

  });

public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
const isbn = req.params.isbn;
  booksCollection = books;
  newCollection = {};

  for(var key in booksCollection) {
      if(booksCollection.hasOwnProperty(key)) {
          var value = booksCollection[key];
          if  (value["isbn"] == (isbn))  {
              newCollection[key] = value["reviews"];
          }
      }
  }
  res.send(newCollection);


});


module.exports.general = public_users;

