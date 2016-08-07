const express = require('express');
const router = express.Router();

const signup = require('../controllers/account/signup_controller');
const login = require('../controllers/account/login_controller');

router.get('/', (req, res) => {
  res.render('index', { title: 'Cedcn' });
});

router.route('/signup')
  .get(signup.show)
  .post(signup.create);

router.route('/login')
  .get(login.show)
  .post(login.create);

module.exports = router;
