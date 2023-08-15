import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../utils/Api.js";

//отрисовка логотипа на странице
function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function handleOpenData() {
    setIsOpen(true);
  }
  function handleCloseData() {
    setIsOpen(false);
  }
  function signOut() {
    api.exitPage().then((data)=>{
      console.log('signOut',data)
      localStorage.removeItem('token');
      props.setLoggedIn(false)
      navigate("/sign-up", { replace: true });

    }).catch((err)=>{console.log(err)})
    
  }
  console.log(isOpen);
  return (
    <header className="header">
      <div
        className={`${isOpen ? "header__opened-data" : "header__mobile-data"}`}
      >
        <p className="header__paragraph">{props.userData}</p>
        <Link onClick={signOut} to="/sign-up" className="header__login">
          Выйти
        </Link>
      </div>
      <div className="header__menu">
        <div className="logo"></div>
        <div className="header__data">
          <p className="header__paragraph">{props.userData}</p>
          <Link onClick={signOut} to="/sign-up" className="header__login">
            Выйти
          </Link>
        </div>
        <button
          className={`${
            isOpen ? "header__mobile-data" : "popup_opened header__open"
          }`}
          onClick={handleOpenData}
        >
          <div className="header__line"></div>
          <div className="header__line"></div>
          <div className="header__line"></div>
        </button>
        <button
          type="button"
          className={`${
            isOpen ? "popup_opened header__close" : "header__mobile-data"
          }`}
          onClick={handleCloseData}
        />
      </div>
    </header>
  );
}

export default Header;
