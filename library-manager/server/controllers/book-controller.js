const { BookModel } = require("../models/book-model");

const addBook = async (req, res) => {
  const { title, author, category, quantity } = req.body;
  const book = new BookModel({ title, author, category, quantity });
  await book.save();
  res.status(201).json(book);
};

const getAllBooks = async (req, res) => {
  const books = await BookModel.find();
  res.json(books);
};

const searchBooks = async (req, res) => {
  const { query } = req.params;
  const books = await BookModel.find({ title: new RegExp(query, 'i') });
  res.json(books);
};

module.exports = { addBook, getAllBooks, searchBooks };
