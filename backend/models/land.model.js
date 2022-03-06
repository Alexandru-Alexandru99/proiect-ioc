const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const landSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8
  },
  mars: {
    type: Number,
    default: 0
  },
  uranus: {
    type: Number,
    default: 0
  },
  moon: {
    type: Number,
    default: 0
  },
  saturn: {
    type: Number,
    default: 0
  },
  jupiter: {
    type: Number,
    default: 0
  },
  neptun: {
    type: Number,
    default: 0
  },
  pluto: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

const Land = mongoose.model('Land', landSchema);

module.exports = Land;