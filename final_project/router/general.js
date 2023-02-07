const express = require('express');
const axios = require('axios')
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if(!isValid(username)){
      users.push({"username": username, "password": password});
      return res.status(300).json({message: "Succesful registration!"});
    }else{
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});




// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(300).json({books: books});
});

public_users.get('/books',function (req, res) {

  const get_books = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    get_books.then(() => console.log("Promise for Task 10 resolved"));

});

public_users.get('/axios',async function (req, res) {
    try{
      const test = await axios.get("http://127.0.0.1:3000/")
      res.status(300).json({books: test.data});
    }catch(err){
      res.status(400).json({"message": err});
    }

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  isbn = req.params.isbn;
  if(books[isbn]){
    return res.status(300).json({book: books[isbn]});
  }else{
    return res.status(404).json({message: "Invalid input"});
  }
 });
  

 public_users.get('/isbn2/:isbn',async function (req, res) {
  isbn = req.params.isbn;
  if(books[isbn]){
    const get_books = new Promise((resolve, reject) => {
      resolve(res.status(300).json({book: books[isbn]}));
    });
    await get_books;
  }else{
    return res.status(404).json({message: "Invalid input"});
  }

});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  author = req.params.author;
  keys = Object.keys(books)
  ans = {}
  keys.forEach((element) => {
    if(books[element].author === author){
      ans[element] = books[element];
    }
  });
  if(Object.keys(ans) > 0){
    return res.status(300).json({books: ans});
  }else{
    return res.status(404).json({message: "Could not find books"});
  }
});

public_users.get('/author2/:author',function (req, res) {
  author = req.params.author;
  keys = Object.keys(books)
  ans = {}
  keys.forEach((element) => {
    if(books[element].author === author){
      ans[element] = books[element];
    }
  });
  if(Object.keys(ans) > 0){
    const get_books = new Promise((resolve, reject) => {
      resolve(res.status(300).json({books: ans}));
    });
    get_books.then(() => console.log("Promise for Task 13 resolved"));
  }else{
    return res.status(404).json({message: "Could not find books"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  title = req.params.title;
  keys = Object.keys(books)
  ans = {}
  keys.forEach((element) => {
    if(books[element].title === title){
      ans[element] = books[element];
    }
  });
  if(Object.keys(ans) > 0){
    return res.status(300).json({books: ans});
  }else{
    return res.status(400).json({message: "Could not find books"});
  }
});

public_users.get('/title2/:title',async function (req, res) {
  title = req.params.title;
  keys = Object.keys(books)
  ans = {}
  keys.forEach((element) => {
    if(books[element].title === title){
      ans[element] = books[element];
    }
  });
  if(Object.keys(ans) > 0){
    const get_books = new Promise((resolve, reject) => {
      resolve(res.status(300).json({books: ans}));
    });
    await get_books;
  }else{
    return res.status(400).json({message: "Could not find books"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  isbn = req.params.isbn;
  book = books[isbn]
  console.log(book)
  if(book){
    return res.status(300).json({review:book.reviews});
  }else{
    return res.status(400).json({message: "Could not find books"});
  }

});

module.exports.general = public_users;
