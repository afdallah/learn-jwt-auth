const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const dbConnection = {
  development: process.env.DB_CONNECTION,
  test: process.env.DB_CONNECTION_TEST,
  staging: process.env.DB_CONNECTION,
  production   : process.env.DB_CONNECTION,
}

const isAuthenticated = require('./middleware/auth');

const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');

// Connect to mongodb
mongoose.connect(dbConnection[env], {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// middleware
app.use(express.json());
app.use(express.static('public'))
app.use(cors());

// Routes
app.get('/', function(req, res) {
  res.send({
    status: true,
    data: 'Hello world'
  })
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', isAuthenticated, bookRouter);

module.exports = app;