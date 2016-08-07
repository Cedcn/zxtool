const { EventEmitter } = require('events');
const validator = require('validator');

const { getUserByLoginName, getUsersByQuery, createEntity } = require('../../proxy/account');
const { tohash } = require('../../common/utils');

exports.show = (req, res) => {
  res.render('users/signup');
};

exports.create = (req, res, next) => {
  const username = validator.trim(req.body.username).toLowerCase();
  const password = validator.trim(req.body.password);

  const emitter = new EventEmitter();
  emitter.on('prop_err', errMsg => {
    res.status(422);
    res.send(errMsg);
    res.end();
  });

  if ([username, password].some(item => item === '')) {
    emitter.emit('prop_err', '用户信息不完整！');
    return;
  }

  if (username.length < 5) {
    emitter.emit('prop_err', '用户名不得少于5个字符！');
    return;
  }

  // if (!validator.isEmail(email)) {
  //   return emitter.emit('prop_err', '邮箱不合法。');
  // }

  getUsersByQuery({ username }, {}, (err, users) => {
    if (err) {
      return next(err);
    }
    if (users.length > 0) {
      emitter.emit('prop_err', '用户名或邮箱已被使用。');
      return;
    }
  });
  tohash(password, (err, passwordHash) => {
    if (err) return next(err);
    createEntity({ username, password: passwordHash }, (err, user) => {
      if (err) return next(err);
      console.log(user);
      res.render('users/signup');
    });
  });
};
