const asyncWrapper = require("../middleware/asyncWrapper.middleware");
const Book = require("../models/book.models");
const { BOOK_FOUND, BOOK_NOT_DELETED, BOOK_NOT_FOUND, BOOK_NOT_REGISTERED, BOOK_NOT_UPDATED, BOOK_REGISTERED, BOOK_UPDATED, BOOKS_FOUND, BOOKS_NOT_FOUND, BOOL_FALSE, BOOL_TRUE, CODE_200, CODE_201, CODE_404, BOOK_DELE, CODE_400, NO_COPY_AVAIL_TO_ISSUE, BOOK_ISSUED_SUCCESSFULLY } = require("../utils/translations");
const ApiError = require("../errors/ApiError");
const ApiResponse = require("../errors/ApiResponseCode");

const createBook = asyncWrapper(async (req, res) => {
  const { title, author, genre, year, copies } = req.body;
  const book = await Book.create({
    title,
    author,
    genre,
    year,
    copies,
    availableCopies: copies,
  });
  if (!book) {
    res.status(CODE_404).json(new ApiError(BOOK_NOT_REGISTERED, CODE_404, BOOL_FALSE));
  } else {
    res.status(CODE_201).json(new ApiResponse(CODE_201, book, BOOK_REGISTERED, BOOL_TRUE))
  }
});

const getAllBooks = asyncWrapper(async (req, res) => {
  const books = await Book.find();
  if (!books) {
    res.status(CODE_404).json(new ApiError(BOOKS_NOT_FOUND, CODE_404, BOOL_FALSE));
  } else {
    res.status(CODE_201).json(new ApiResponse(CODE_201, books, BOOKS_FOUND, BOOL_TRUE))
  }
});

const getBookById = asyncWrapper(async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findOne({ _id: bookId });
  if (!book) {
    res.status(CODE_404).json(new ApiError(BOOK_NOT_FOUND, CODE_404, BOOL_FALSE))
  } else {
    res.status(CODE_200).json(new ApiResponse(CODE_200, book, BOOK_FOUND, BOOL_TRUE))
  }
});

const updateBook = asyncWrapper(async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findByIdAndUpdate({ _id: bookId }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true
  });
  if (!book) {
    res.status(CODE_404).json(new ApiError(BOOK_NOT_UPDATED, CODE_404, BOOL_FALSE))
  } else {
    res.status(CODE_200).json(new ApiResponse(CODE_200, book, BOOK_UPDATED, BOOL_TRUE))
  }
});

const deleteBook = asyncWrapper(async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findByIdAndDelete({ _id: bookId });
  if (!book) {
    res.status(CODE_404).json(new ApiError(BOOK_NOT_DELETED, CODE_404, BOOL_FALSE))
  } else {
    res.status(CODE_200).json(new ApiResponse(CODE_200, {}, BOOK_DELE, BOOL_TRUE))
  }
});

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
}

