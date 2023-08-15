import React from "react";

//отрисовка формы на странице
function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="form popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="form__save popup__button" type="submit">
            {props.button}
          </button>
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
