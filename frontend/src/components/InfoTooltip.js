import React from "react";
import sucReg from '../images/sucReg.png'
import badReg from '../images/badReg.png'
import {useNavigate } from 'react-router-dom';
//отрисовка формы на странице
function InfoTooltip(props) {
  const navigate = useNavigate();
  if (props.isRegister && !props.isOpen){
    navigate("/sign-in", {replace: true})
    props.setIsRegister(false)
  }
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.closePopup}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
      <img
          className="popup__photo-register"
          src={props.isRegister ? sucReg : badReg}
          alt={props.name}
        />
        <button
          type="button"
          className="popup__close"
          onClick={props.closePopup}
        />
        <h2 className="popup__title-register">{props.isRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;