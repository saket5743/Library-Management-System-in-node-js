const express = require('express');
const checkPermission = require('../middleware/checkPermission.middleware');
const authenticateToken = require('../middleware/authentication.middleware');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/book.controller');
const router = express.Router();

// Admin
router.route('/createBook').post(authenticateToken, checkPermission('createbook'), createBook);
router.route('/:id').put(authenticateToken, checkPermission('updatebook'), updateBook).delete(authenticateToken, checkPermission('deletebook'), deleteBook);

// User
router.route('/getAllBooks').get(authenticateToken, checkPermission('getallbooks'), getAllBooks);
router.route('/getBookById/:id').get(authenticateToken, checkPermission('getbookbyid'), getBookById);

module.exports = router;

