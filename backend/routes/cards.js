const router = require('express').Router();
const {
  getCards, createCard, deleteCard, createLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', createLike);
router.delete('/:cardId/likes', deleteLike);
router.post('/', createCard);
module.exports = router;
