const mongoose = require('mongoose');
const User = require('./user');

const regex = /https?:\/\/(www\.)?\w*/;

const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String, // гендер — это строка
    required: true, // оно должно быть у каждого пользователя\
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Неправильная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: User,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
