const mongoose = require('mongoose');
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
})

module.exports = mongoose.model('User', userSchema);