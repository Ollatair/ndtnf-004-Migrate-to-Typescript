import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socketIo from 'socket.io';

import session from 'express-session';
import passport from 'passport';
import passport-local from 'passport-local';
const LocalStrategy = passport-local.Strategy;

import user from './routes/api/user';
import book from './routes/api/book';
import message from './routes/api/message';
import error404 from './middleware/err-404';

import bookController from './controllers/booksApi';
import userController from './controllers/userApi';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'localhost';

const options = {
  usernameField: 'username',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, userController.verifyUser));

passport.serializeUser(userController.serializeUser);
passport.deserializeUser(userController.serializeUser);

const app = express();
const server = http.Server(app);
const io = socketIo(server);
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

app.use(error404);

async function start() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    bookController.addBooks();
    server.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

io.on('connection', (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);

  const { bookId } = socket.handshake.query;
  console.log(`Socket roomName: ${bookId}`);
  socket.join(bookId);
  socket.on('message-to-book', (msg) => {
    socket.to(bookId).emit('message-to-book', msg);
    socket.emit('message-to-book', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
});
