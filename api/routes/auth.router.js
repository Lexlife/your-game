const express = require('express');
const isAuth = require('../middlewares/auth.middleware');

const {
  signUp,
  signIn,
  signOut,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/signout', signOut);

router.get('/check', isAuth, (req, res) => {
  res.json({ session: true, login: res.locals.userlogin, message: 'authorized' });
});

module.exports = router;
