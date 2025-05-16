const express = require('express');
const getAllIssueBook = require('../controllers/getAllIssueBook.controller');
const router = express.Router();

router.route('/:userId/issue').get(getAllIssueBook);

module.exports = router;