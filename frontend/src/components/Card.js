import { React, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
// отрисовка карточки
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked && "place__like_active"
  }`;
  console.log(card)
  console.log(card.likes)
  const isOwn =
    card.owner === currentUser._id || card.owner._id === currentUser._id;
  function handleClick() {
    onCardClick({ name: card.name, link: card.link });
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="place">
      <div className="place__info">
        <img
          className="place__photo"
          src={card.link}
          onClick={handleClick}
          alt={card.name}
        />
        {isOwn && (
          <button
            type="button"
            className="place__close"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
      <div className="place__footer">
        <h2 className="place__title">{card.name}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <p className="place__subtitle">{card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
