// const { EventEmitter } = require('events');
// const validator = require('validator');
const passport = require('passport');
const _ = require('lodash');

exports.show = (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/');
  res.render('users/login', { message: req.flash('info') });
};

exports.create = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.flash('error', info.message);
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('back');
    });
  })(req, res, next);
};
