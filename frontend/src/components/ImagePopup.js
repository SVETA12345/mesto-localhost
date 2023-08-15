import React from "react";

//отрисовка картинки по клику на карточку
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${
        card.link !== "" ? "popup_opened" : ""
      }`}
      onClick={onClose}
    >
      <div className="popup__card" onClick={(e) => e.stopPropagation()}>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
        <button
          type="button"
          className="popup__close popup__close_card_photo"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
