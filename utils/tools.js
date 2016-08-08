const bcrypt = require('bcryptjs');

exports.tohash = (str, callback) => {
  bcrypt.hash(str, 10, callback);
};

exports.compare = (str, hash, callback) => {
  bcrypt.compare(str, hash, callback);
};
