const mongoose = require('mongoose');
const validatorEmail = require('validator');

const regex = /https?:\/\/(www\.)?\w*/;

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // gender может принимать одно из трёх значений
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String, // гендер — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // gender может принимать одно из трёх значений
    default: 'Исследователь',
  },
  avatar: {
    type: String, // имя — это строка
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Неправильная ссылка',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        console.log(v, validatorEmail.isEmail(v));
        return validatorEmail.isEmail(v);
      },
      message: 'Неправильный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
