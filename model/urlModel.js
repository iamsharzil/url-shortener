const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String
  },
  longUrl: {
    type: String
  },
  shortUrl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  clicks: {
    type: Number,
    default: 0
  }
});

const URL = mongoose.model('Url', urlSchema);

module.exports = URL;
