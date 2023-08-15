import { React, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as duckAuth from "../utils/duckAuth.js";
import InfoTooltip from "./InfoTooltip";
//отрисовка страницы авторизации
function Register(props) {
  const closePopup = () => {
    props.setIsOpenRegister(false);
  };
  function handleChangeName(e) {
    props.setNameRegister(e.target.value);
  }
  function handleChangePassword(e) {
    props.setPasswordRegister(e.target.value);
  }
  
  return (
    <>
      <InfoTooltip 
        isOpen={props.isOpenRegister} 
        isRegister={props.isRegister} 
        name="register" 
        closePopup={closePopup}
        setIsRegister={props.setIsRegister} 
      ></InfoTooltip> 
      <header className="header">
        <div className="header__menu">
          <div className="logo"></div>
          <Link to="/sign-in" className="header__login">
            Войти
          </Link>
        </div>
      </header>
      <div className="login">
        <h1 className="login__title">Регистрация</h1>
        <form className="form popup__form">
          <input
            value={props.username}
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
            onClick={props.handleSubmitRegister}
          >
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="login__footer popup__button">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
