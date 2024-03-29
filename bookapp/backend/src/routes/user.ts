import express  from "express";
import passport from "passport";

const apiUsersRouter = express.Router();

const {
  userLogin,
  userRegister,
  userProfile,
} = require('../controllers/userApi');

apiUsersRouter.get('/me', userProfile);
apiUsersRouter.post('/login', passport.authenticate('local', { failureMessage: 'Неправильный логин или пароль' }), userLogin);
apiUsersRouter.post('/signup', userRegister);

export default apiUsersRouter;
