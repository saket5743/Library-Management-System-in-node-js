const ApiError = require("../errors/ApiError");
const ApiResponse = require("../errors/ApiResponseCode");
const asyncWrapper = require("../middleware/asyncWrapper.middleware");
const Book = require("../models/book.models");
const Issue = require("../models/issueBook.models");
const { CODE_404, BOOK_NOT_FO, BOOL_FALSE, NO_COPY_AVAIL_TO_ISSUE, DAYS_GREAT_THAN_ZERO, CODE_500, UNKNOWN_ERROR, CODE_201, ISSUE_DATE_CREATED, BOOL_TRUE, ISSUE_BOOK_NOT_FOUND, BOOK_ISSUED_SUCCESSFULLY, BOOK_RETURNED, BOOK_NOT_ISSUED_TO_THIS_USER } = require("../utils/translations");

// Issue Book
const issueBook = asyncWrapper(async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findById({ _id: bookId });
  if (!book) {
    res.status(CODE_404).json(new ApiError(BOOK_NOT_ISSUED_TO_THIS_USER, CODE_404, BOOL_FALSE));
  }
  if (book.availableCopies <= 0) {
    res.status(CODE_404).json(new ApiError(NO_COPY_AVAIL_TO_ISSUE, CODE_404, BOOL_FALSE));
  }

  const { userId, days } = req.body;
  if (!days || days <= 0) return res.status(CODE_404).json(new ApiError(DAYS_GREAT_THAN_ZERO, CODE_404, BOOL_FALSE));

  book.availableCopies = book.availableCopies - 1;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + days)

  const issue = await Issue.create({ _id: bookId, userId, dueDate });
  if (!issue) {
    res.status(CODE_500).json(new ApiError(UNKNOWN_ERROR, CODE_500, BOOL_FALSE))
  }
  res.status(CODE_201).json(new ApiResponse(CODE_201, issue, ISSUE_DATE_CREATED, BOOL_TRUE));
});

// Return Book
const returnBook = asyncWrapper(async (req, res) => {
  const { userId } = req.body;
  const { id: bookId } = req.params;
  const issue = await Issue.findOne({ _id: bookId, userId, returned: false });
  if (!issue) {
    return res.status(CODE_404).json(new ApiError(ISSUE_BOOK_NOT_FOUND, CODE_404, BOOL_FALSE));
  }
  const book = await Book.findById({ _id: bookId });
  if (!book) {
    return res.status(CODE_404).json(new ApiError(BOOK_NOT_FO, CODE_404, BOOL_FALSE));
  }
  issue.returned = true;
  issue.returnDate = new Date();

  // calculate fine
  const daysLate = Math.ceil((new Date() - new Date(issue.dueDate)) / (1000 * 60 * 60 * 24));
  if (daysLate > 0) {
    issue.fine = daysLate * 10;
  }
  await issue.save();
  book.availableCopies += 1;
  await book.save();
  res.status(CODE_201).json(new ApiResponse(CODE_201, issue, BOOK_RETURNED, BOOL_TRUE));
});

module.exports = { issueBook, returnBook };
