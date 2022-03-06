const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: "user"
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstname: {
    type: String,
    minlength: 6
  },
  lastname: {
    type: String,
    minlength: 6
  },
  phonenumber: {
    type: String,
    minlength: 6
  },
  address: {
    type: String,
    minlength: 6
  },
}, {
  timestamps: true,
});

userSchema.set('toJSON', {

  transform: (document, returnedObject) => {

    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id

    delete returnedObject.__v

  }

})

const User = mongoose.model('User', userSchema);

module.exports = User;