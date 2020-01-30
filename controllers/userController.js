const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// models
const User = require('../models/user');

exports.getAll = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: true,
      data: users
    })
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    })
  }
}

exports.create = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // update password to hash
    req.body.password = hash;

    const user = await User.create(req.body);
    res.send(user);
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    })
  }
}

exports.update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: req.body },
      { new: true }
    );

    res.send(user);
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    })
  }
}

exports.login = async(req, res) => {
  try {
    // query user
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send({ message: 'Wrong email or password!'});

    // validasi password dengan bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send({ message: 'Wrong email or password!' });

    // kalo sama, generate token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.send(token);
  } catch(err) {
    res.status(400).json({
      status: false,
      errors: err
    })
  }
}