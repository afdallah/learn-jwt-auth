const bcrypt = require('bcryptjs');

// models
const User = require('../models/user');

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      errors: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // update password to hash
    req.body.password = hash;

    const user = await User.create(req.body);
    res.status(200).send({
      status: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      errors: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: req.body },
      { new: true },
    );

    res.status(200).send({
      status: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      errors: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // query user
    const token = await User.authenticate(req.body);
    res.status(200).send({
      status: true,
      data: token,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      errors: err,
    });
  }
};
