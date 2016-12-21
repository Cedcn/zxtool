const express = require('express');
const router = express.Router();

const signup = require('../controllers/account/signup_controller');
const login = require('../controllers/account/login_controller');

const { isAuthenticated } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.render('index', { title: 'Cedcn' });
});

router.get('/preview', (req, res) => {
  res.render('preview');
});

router.get('/control', isAuthenticated, (req, res) => {
  req.flash('info', 'hello!');
  res.render('index', { title: 'Control' });
});

router.route('/signup')
  .get(signup.show)
  .post(signup.create);

router.route('/login')
  .get(login.show)
  .post(login.create);

router.get('logout', (req, res) => {
  req.logout();
  res.redirect('back');
});

module.exports = router;
