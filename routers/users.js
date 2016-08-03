const express = require('express');
const router = express.Router();

router.route('/login')
  .get((req, res) => {
    res.render('users/login');
  })
  .post((req, res) => {
    res.redirect('back');
  });


module.exports = router;
