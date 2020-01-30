const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000;

const isAuthenticated = require('./middleware/auth');

const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');

// Connect to mongodb
mongoose.connect('mongodb://localhost/auth-withjwt', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', isAuthenticated, bookRouter);

app.listen(port, () => `Server is running on port ${port}`)