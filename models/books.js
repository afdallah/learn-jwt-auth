const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    trim: true
  },
  ISBN: {
    type: String,
    unique: true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('Book', bookSchema);