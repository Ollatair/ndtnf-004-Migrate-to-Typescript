import { Request, Response } from "express";
import { User } from "../models/user";


export const serializeUser = (user: any, cb: any) => {
  cb(null, user);
};

export const deserializeUser = (user: any, cb: any) => {
  User.findById(user.id, (err: any, userData: any) => {
    if (err) { return cb(err); }
    return cb(null, userData);
  });
};

export const verifyUser = async (username: any, password: any, done: any) => {
  await User.findOne({ username })
    .then((user: any) => {
      if (!user) { return done(null, false); }
      if (user.password === password) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((e: Error | any) => done(e));
};


// userLogin
export const userLogin = (req: Request, res: Response) => {
  res.json(req.user);
};

// userRegister
export const userRegister = async (req: Request, res: Response) => {
  const {
    displayName, username, password,
  } = req.body;
  if (!username || !password) {
    return res.status(400).json('Отсутствуют обязательные поля');
  }
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      const newUser = await User.create({
        displayName, username, password,
      });
      return res.status(201).json(newUser);
    }
    return res.status(409).json(`Пользователь "${username}" уже существует в базе данных`);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Ошибка при добавлении пользователя');
  }
};

// userProfile
export const userProfile = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json('Нет доступа');
  }
  return res.status(200).json(req.user);
};
