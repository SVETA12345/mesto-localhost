import { React, useState, useRef, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
//отрисовка страницы авторизации
function Login(props) {
  const navigate = useNavigate();
  const closePopup = () => {
    props.setIsOpenLogin(false);
  };
  function handleChangeName(e) {
    props.setName(e.target.value);
  }
  function handleChangePassword(e) {
    props.setPassword(e.target.value);
  }
  
  return (
    <>
    <InfoTooltip 
        isOpen={props.isOpenLogin} 
        isRegister={false} 
        name="login" 
        closePopup={closePopup}
        setIsRegister={props.setIsRegister} 
      ></InfoTooltip> 
      <header className="header">
        <div className="header__menu">
          <div className="logo"></div>
          <Link to="/sign-up" className="header__login">
            Регистрация
          </Link>
        </div>
      </header>
      <div className="login">
        <h1 className="login__title">Вход</h1>
        <form className="form popup__form">
          <input
            value={props.name}
            onChange={handleChangeName}
            type="email"
            placeholder="Email"
            className="form__name_mesto_title login__input"
            name="username"
            required
            minLength={2}
            maxLength={30}
            id="username"
          />
          <span className="mesto-name-error form__item-error form__item-error_field_name"></span>
          <input
            value={props.password}
            onChange={handleChangePassword}
            type="password"
            placeholder="Пароль"
            className="form__name_mesto_src login__input"
            name="password"
            id="password"
            required
          />
          <button
            className="login__save popup__button"
            type="submit"
            onClick={props.handleSubmit}
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
