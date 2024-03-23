const router = require('express').Router();
const passport = require('passport');
const {
  renderProfile,
  renderLogin,
  userLogin,
  userLogout,
  renderRegister,
  userRegister,
} = require('../controllers/userPages');

router.get('/me', renderProfile);
router.get('/login', renderLogin);
router.post('/login', passport.authenticate('local', { failureRedirect: '/user/login' }), userLogin);
router.get('/register', renderRegister);
router.post('/register', userRegister);
router.get('/logout', userLogout);

module.exports = router;
