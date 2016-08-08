const { EventEmitter } = require('events');
const validator = require('validator');

const { getUserByLoginName } = require('../../proxy/account');
const { compare } = require('../../utils/tools');

exports.show = (req, res) => {
  res.render('users/login');
};

exports.create = (req, res, next) => {
  const username = validator.trim(req.body.username).toLowerCase();
  const password = validator.trim(req.body.password);

  if (!username || !password) {
    res.status(422).send('信息不完整！').end();
    return;
  }

  const emitter = new EventEmitter();

  emitter.on('login_err', () => {
    res.status(403).send('用户名或密码错误！').end();
  });

  getUserByLoginName(username, (err, user) => {
    if (!user) {
      return emitter.emit('login_err');
    }
    compare(password, user.password, (err, result) => {
      if (err) return next(err);
      if (!result) return emitter.emit('login_err');
      req.session.user = user;
      res.send('登陆成功').end();
    });
  });
};
