import express  from "express";
import passport from "passport";

const apiUsersRouter = express.Router();

import  {
  userLogin,
  userRegister,
  userProfile,
} from '../controllers/userApi';

apiUsersRouter.get('/me', userProfile);
apiUsersRouter.post('/login', passport.authenticate('local', { failureMessage: 'Неправильный логин или пароль' }), userLogin);
apiUsersRouter.post('/signup', userRegister);

export default apiUsersRouter;
