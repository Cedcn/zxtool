const LocalStrategy = require('passport-local').Strategy;
const { compare } = require('../utils/tools');
const { getUserByLoginName } = require('../proxy/account');

exports.localStrategy = new LocalStrategy(
  (username, password, done) => {
    getUserByLoginName(username, (err, user) => {
      if (!user) {
        return done(null, false, { type: 'error', message: '用户名或密码错误！' });
      }
      compare(password, user.password, (err, result) => {
        if (err) return done(null, false, { message: err });
        if (!result) return done(null, false, { type: 'error', message: '用户名或密码错误！' });
        return done(null, user);
      });
    });
  }
);
