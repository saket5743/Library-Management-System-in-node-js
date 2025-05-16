const ApiError = require("../errors/ApiError");
const ApiResponse = require("../errors/ApiResponseCode");
const asyncWrapper = require("../middleware/asyncWrapper.middleware");
const Issue = require("../models/issueBook.models");
const { CODE_404, BOOK_NOT_ISSUED_TO_THIS_USER, BOOL_FALSE, CODE_200, BOOKS_FO, BOOL_TRUE } = require("../utils/translations");

const getAllIssueBook = asyncWrapper(async (req, res) => {
  const issues = await Issue.find();
  if (!issues) {
    res.status(CODE_404).json(new ApiError(BOOK_NOT_ISSUED_TO_THIS_USER, CODE_404, BOOL_FALSE));
  }
  res.status(CODE_200).json(new ApiResponse(CODE_200, issues, BOOKS_FO, BOOL_TRUE));
});

module.exports = getAllIssueBook;
