const mongoose = require('mongoose');

const issueBookSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  },
  returned: {
    type: Boolean,
    default: false
  },
  returnDate: {
    type: Date
  },
  fine: {
    type: Number,
    default: 0
  }
});

const Issue = mongoose.model('Issue', issueBookSchema);

module.exports = Issue;

