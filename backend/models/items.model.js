const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8
  },
  cantity: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;