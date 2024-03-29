import express from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';


import session from 'express-session';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; 

import user from './routes/user';
import book from './routes/book';
import message from './routes/message'; 

import { addBooks } from './controllers/booksApi';
import {verifyUser, serializeUser, deserializeUser} from './controllers/userApi';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'localhost';

const options = {
  usernameField: 'username',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, verifyUser));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
 
app.use('/api/user', user);
app.use('/api/books', book);
app.use('/api/message', message);
 

async function start() {
  try {
    await mongoose.connect(DB_URL);
    addBooks();
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
 