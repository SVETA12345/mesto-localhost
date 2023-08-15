const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  updateUserAvatar,
  login,
} = require('./controllers/users');

const app = express();
const allowedCors = [
  'https://svetlana-backend.students.nomoredomains.xyz',
  'http://svetlana-backend.students.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:4000',
];
// 0.0.0.0:27017
mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected db');
  });
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/loginout', (req, res) => {
  console.log('start', req.cookies);
  res.status(200).clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }).send({ message: 'exit' });
  res.end();
});

app.use(errorLogger);
app.use(auth);
app.use(routes);
app.use((err, req, res, next) => {
  console.log(err);
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(4000, () => {
  console.log('server is running');
});
