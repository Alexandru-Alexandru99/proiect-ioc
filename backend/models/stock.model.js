const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8
  },
  transport: {
    type: Number,
    default: 0
  },
  medicine: {
    type: Number,
    default: 0
  },
  education: {
    type: Number,
    default: 0
  },
  infrastructure: {
    type: Number,
    default: 0
  },
  tesla: {
    type: Number,
    default: 0
  },
  spaceX: {
    type: Number,
    default: 0
  },
  agriculture: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;