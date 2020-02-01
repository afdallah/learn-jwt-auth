const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: 'Email field is required!'
  },
  password: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});

const User = mongoose.model('User', userSchema);

User.authenticate = function (data) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ email: data.email })
    if (!user) return reject('No user found');

    const validPassword = await bcrypt.compare(data.password, user.password)
    if (!validPassword) return reject('User or password is incorrect');

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    resolve(token)
  })
}

module.exports = User;