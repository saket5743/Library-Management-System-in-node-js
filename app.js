const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userReg = require('./routes/user.router');
const bookRouter = require('./routes/book.router');
const issueBookRouter = require('./routes/issueBook.router');
const getAllIssueBookRouter = require('./routes/getAllIssueBooks.router');
const roleRouter = require('./routes/role.router');
const connectDB = require('./db/connect.db');
dotenv.config();
const PORT = 3535;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', userReg);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/book', issueBookRouter);
app.use('/api/v1/book/user', getAllIssueBookRouter);
app.use('/api/v1/role', roleRouter);

const start = async () => {
  try {
    await connectDB();
    console.log("DB is connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error);
  }
}
start();
