const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const walletSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8
  },
  ech: {
    type: Number,
    default: 0
  },
  btc: {
    type: Number,
    default: 0
  },
  atc: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;