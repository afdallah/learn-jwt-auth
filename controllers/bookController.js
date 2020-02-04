const Book = require('../models/book');

exports.getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({
      status: true,
      data: books
    });
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    })
  }
}

exports.create = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      status: true,
      data: book
    });
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    });
  }
}

exports.update = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { ISBN: req.body.ISBN },
      { $set: req.body },
      { new: true }
    )

    res.status(200).json({
      status: true,
      data: book
    });
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    })
  }
}