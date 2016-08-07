const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  avatar: { type: String },
});

const UserModel = db.model('users', userSchema);

module.exports = UserModel;
