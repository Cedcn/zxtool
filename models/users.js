const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  avatar: { type: String },
  create_at: { type: Date, detault: Date.now },
});

const UserModel = db.model('users', userSchema);

module.exports = UserModel;
