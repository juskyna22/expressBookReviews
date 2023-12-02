const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid

    let sameName = users.filter((user)=>{
        return user.username === username
    });
    if(sameName.length > 0){
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.

    let regUser = users.filter((user)=>{
        return (user.username === username && user.password === password)
    });
    if(regUser.length > 0){
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Write your code here
const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  console.log("Access Token: " + accessToken + " Username: " + username);
  console.log("req.session.authorization: " + req.session.authorization);
  return res.status(200).send("Successful login you all star member");
  } else {
    return res.status(208).json({message: "Oops! Check login credentials and try again"});
  }
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    
    const byISBN = req.params.isbn;
    console.log(byISBN);
    let scannedBooks = books[byISBN]
    console.log(scannedBooks);
    if (scannedBooks) {
        let addedReview = req.query.reviews;
        console.log("New Review: "+addedReview)
        for(var key in books) {
            if(books.hasOwnProperty(key)) {
                var updatedReview = books[key];
                console.log("Review: "+updatedReview)
                if  (key == byISBN) {
                    updatedReview["reviews"] = addedReview;
                    console.log("New review: " + updatedReview["reviews"]);
                }

            }
        }

        res.send(`Your amazing review for the book with isbn ${byISBN} has been added or modified for all to see. `)
    }

});

regd_users.delete("/auth/review/:isbn", (req, res) => {

    
    userName = req.body.username;
    console.log("Username: " + userName);
    const byISBN = req.params.isbn;
    console.log(byISBN);
    let scannedBooks = books[byISBN]
    console.log(scannedBooks);
    if (scannedBooks) { //Check if the book exists
        let addedReview = {};
        console.log("New Review: "+addedReview)
        for(var key in books) {
            if(books.hasOwnProperty(key)) {
                var updatedReview = books[key];
                console.log("Value: "+updatedReview)
                if  (key == byISBN) {
                    updatedReview["reviews"] = addedReview;
                    console.log("Deleted Review: " + updatedReview["reviews"]);
                }

            }
        }

        res.send(`Your poorly written review ${userName} with isbn ${byISBN} has been deleted. `)
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;




