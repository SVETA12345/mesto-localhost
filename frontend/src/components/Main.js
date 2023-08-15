import React from "react";
import karandash from "../images/karandash.svg";
import { api } from "../utils/Api.js";
import { useState, useEffect, useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header";
import Footer from "./Footer";
//отрисовка профиля на странице
function Main(props) {
  let currentUser = useContext(CurrentUserContext);
  console.log('currentUser', currentUser)
  if ('data' in currentUser){
    currentUser = currentUser.data
  }
  console.log('currentUser-posle', currentUser)
  return (
    <>
    <Header userData={props.userData} setLoggedIn={props.setLoggedIn}/>
    <main>
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__background profile__open-avatar"
            id="button_avatar"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <div className="profile__button">
              <img alt="автарка" className="profile__image" src={karandash} />
            </div>
          </button>
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__second-name">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit"
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        {props.cards.map((card) => (
          <Card
            onCardLike={props.onCardLike}
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
    <Footer />
    </>
  );
}

export default Main;
