import { React, useState, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateCard({
      title: name,
      link: link,
    });
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);
  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleChangeName}
        type="text"
        placeholder="Название"
        className="form__name form__name_mesto_title popup__input"
        name="name"
        required
        minLength={2}
        maxLength={30}
        id="mesto-name"
      />
      <span className="mesto-name-error form__item-error form__item-error_field_name"></span>
      <input
        value={link}
        onChange={handleChangeLink}
        type="url"
        placeholder="Ссылка на картинку"
        className="form__name form__name_mesto_src popup__input"
        name="link"
        id="mesto-url"
        required
      />
      <span className="mesto-url-error form__item-error form__item-error_field_name"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
