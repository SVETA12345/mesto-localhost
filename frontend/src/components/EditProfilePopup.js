import { React, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

//открытие формы редактирования профиля
function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  // обработка input Имя
  function handleChangeName(e) {
    setName(e.target.value);
  }

  // обработка input Работа
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(name, description)
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  useEffect(() => {
    console.log(currentUser)
    if ('data' in currentUser){
    setName(currentUser.data.name);
    setDescription(currentUser.data.about);
    }
    else {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleChangeName}
        type="text"
        placeholder="Название"
        className="form__name form__name_theme_first popup__input"
        name="name"
        required
        minLength={2}
        maxLength={40}
        id="name-input"
      />
      <span className="name-input-error form__item-error form__item-error_field_name"></span>
      <input
        value={description}
        onChange={handleChangeDescription}
        type="text"
        placeholder="Название"
        className="form__name form__name_theme_job popup__input"
        name="about"
        required
        minLength={2}
        maxLength={200}
        id="job-input"
      />
      <span className="job-input-error form__item-error form__item-error_field_name"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
