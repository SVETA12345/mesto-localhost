const Card = require('../models/card');
const httpConstants = require('http2').constants;
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized');

const getCards = (req, res, next) => Card.find({})
  .then((card) => {
    console.log(card);
    res.status(httpConstants.HTTP_STATUS_OK).send(card);
  })
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      next(new NotFoundError('карточка или пользователь не найден'));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
    } else {
      next(err);
    }
  });

const createCard = (req, res, next) => {
  const newCardData = req.body;
  console.log('req.user._id', req.user._id);
  newCardData.owner = req.user._id;
  return Card.create(newCardData)
    .then((newCard) => res.status(httpConstants.HTTP_STATUS_CREATED).send(newCard))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('карточка или пользователь не найден'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  console.log('req.user', req.user, req.body);
  if (req.user._id === req.body.owner) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail()
      .then((card) => res.send({ data: card }))
      .catch((err) => {
        if (err.name === 'DocumentNotFoundError') {
          next(new NotFoundError('карточка или пользователь не найден'));
        } else if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new BadRequestError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
        }
      });
  } else { throw new UnauthorizedError('Недостаточно прав'); }
};
const createLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail()
  .then((like) => res.send({ data: like }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      next(new NotFoundError('карточка или пользователь не найден'));
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
    } else {
      next(err);
    }
  });
const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('карточка или пользователь не найден'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  createLike,
  deleteLike,
};
