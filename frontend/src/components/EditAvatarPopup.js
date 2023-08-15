import { React, useContext, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        placeholder="Ссылка на картинку"
        className="form__name form__name_avatar_src popup__input"
        name="link"
        id="avatar-url"
        required
      />
      <span className="avatar-url-error form__item-error form__item-error_field_name"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
