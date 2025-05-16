const express = require('express');

const { issueBook, returnBook } = require('../controllers/issueBook.controller');
const router = express.Router();

router.route('/:id/issue').post(issueBook);
router.route('/:id/return').post(returnBook);

module.exports = router;

