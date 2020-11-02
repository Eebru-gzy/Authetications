const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
  // _id: {
  //   type: String,
  //   default: mongoose.Types.ObjectId
  // },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model('users', UserSchema);