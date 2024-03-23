const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  userLogin,
  userRegister,
  userProfile,
} = require('../../controllers/userApi');

router.get('/me', userProfile);
router.post('/login', passport.authenticate('local', { failureMessage: 'Неправильный логин или пароль' }), userLogin);
router.post('/signup', userRegister);

module.exports = router;
