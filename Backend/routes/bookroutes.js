const express = require('express');
const router = express.Router();
const Book = require('../models/bookmodel')
const validateBook = require('../middleware/validatebook')


// saving book to database
router.post ('/', validateBook,async(req,res)=>{
  const {title,author,publishYear} = req.body;
  const book = new Book({title,author,publishYear});
  console.log(book+"Added")

  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

//   Get All Books from database

router.get('/',async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//   get one book

router.get('/:id',async (req, res) => {
  try {
    const id = req.params.id;
    const books = await Book.findById(id);
    res.status(200).send(books);
  } catch {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//   Update a Book
router.put('/:id', validateBook,async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).send({ message: "Book not found" });
    } else {
      res.status(200).send({ message: "Book updated successfully" });
    }
  } catch {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


//   Delete a Book

router.delete('/:id',async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndDelete(id);
    console.log(result + "resultttttt");
    if (!result) {
      res.status(404).send({ message: "Book not found" });
    } else {
      console.log("hiiiii");
      res.status(200).send({ message: "Book Deleted successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;