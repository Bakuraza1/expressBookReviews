const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  let sameName = users.filter(user => user.username === username);
  if(sameName.length > 0){
    return true;
  }else{
    return false;
  }
}


const authenticatedUser = (username,password)=>{ //returns boolean
  let validUsers = users.filter(function(user){
    return user.username === username && user.password === password
  });
  if (validUsers.length > 0){
    return true;
  }else{
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username =  req.body.username;
  const password = req.body.password;

  if(!username || !password){
    return res.status(404).json({message: "Error logging in"});
  }
  if(authenticatedUser(username, password)){
    let accessToken = jwt.sign({
      data: password
    }, 'access', {expiresIn: 60*60});
    req.session.authorization = {
      accessToken,username
    }
    return res.status(200).json({message: "Log in success!"});
  }else{
    return res.status(300).json({message: "Invalid login check credentials!"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  isbn = req.params.isbn
  review = req.body.review
  if(books[isbn]){
    books[isbn].reviews[req.session.authorization.username] = review;
    return res.status(200).json({message: "Review added!"});
  }
  return res.status(404).json({message: "Error adding review"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  isbn = req.params.isbn
  user = req.session.authorization.username
  if(books[isbn]){
    delete books[isbn].reviews[user];
    return res.status(200).json({message: "Review deleted"});
  }
  return res.status(404).json({message: "Error deleting review"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
