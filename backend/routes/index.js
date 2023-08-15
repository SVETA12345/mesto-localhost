const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const httpConstants = require('http2').constants;

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res) => {
  res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'карточка или пользователь не найден' });
});
module.exports = router;
