const Book = require('../models/books');

exports.getAll = async (req, res) => {
  const books = await Book.find();
  res.send(books);
}

exports.create = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.send(book);
  } catch(err) {
    res.sendStatus(400);
  }
}

exports.update = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { ISBN: req.body.ISBN },
      { $set: req.body }
    )

    res.send(book);
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    })
  }
}