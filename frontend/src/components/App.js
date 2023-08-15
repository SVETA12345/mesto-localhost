import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import * as duckAuth from '../utils/duckAuth.js';

//отрисовка страницы
function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setNameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [userData, setUserData]=useState({email: ''})
  const [loggedIn, setLoggedIn]=useState(false)
  const [selectedCard, onCardClick] = useState({ name: "", link: "" });
  //обработка события: открытие формы профиля
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const navigate = useNavigate();
  
 

  function handleSubmitRegister(e) {
    e.preventDefault();
    setIsOpenRegister(true);
    duckAuth.register(passwordRegister, username).then((res) => {
      if (res) {
        setIsRegister(true);
      } else {
        setIsRegister(false);
      }
    }).catch((err) => console.log(err));;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password, name)
    duckAuth
      .authorize(password, name)
      .then((data) => {
        console.log('dataAVT', data)
        if (data.token) {
          console.log('avtoriz yes')
          setName("");
          setPassword("");
          handleLogin();
          navigate("/", { replace: true });
        }
        else {

          setIsOpenLogin(true);}
      })
      .catch((err) => {
        setIsOpenLogin(true);
        console.log(err)});
  };

  // Обработчик клика на лайк
  function handleCardLike(card) {
    console.log('card__app', card)
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i=== currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, card.owner)
      .then(() => {
        setCards(
          cards.filter(function (item) {
            return item._id !== card._id;
          })
        );
      })
      .catch((err) => console.log(err));
  }



const tokenCheck = () => {
  // если у пользователя есть токен в localStorage, 
  // эта функция проверит, действующий он или нет
  duckAuth.getContent().then((res) => {
    if (res){
                // авторизуем пользователя
      setLoggedIn(true);
      setUserData({email: res.email})
      console.log('yes')
      navigate("/", {replace: true}) 
    }
  }).catch((err) => console.log(err));

  }

  function handleUpdateUser({ name, about }) {
    api
      .sendDataProfile(name, about)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar: avatar }) {
    console.log(avatar)
    api
      .avatarProfile(avatar)
      .then((data) => {
        setCurrentUser(data.link);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }

  function handleUpdateCard({ title, link }) {
    api
      .createMestoCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }
  //обработка события: открытие формы для карточек
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  //обработка события: клик по кнопке аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  //обработка закрытия попапа
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    onCardClick({ name: "", link: "" });
  }
  //если пользователь уже зарегистрирован
  function handleLogin () {
    setLoggedIn(true)
} 
  useEffect(() => {
    tokenCheck();
    const apiProfileDefult = api.getUserData();
    apiProfileDefult
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    api
      .getInitialCards()
      .then((data) => {
        const results = data.map((item) => ({
          _id: item._id,
          name: item.name,
          owner: item.owner,
          link: item.link,
          likes: item.likes,
        }));
        setCards(results);
      })
      .catch((err) => {
        setLoggedIn(false)
        console.log(err)});
  }, [loggedIn]);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;
  // закрытие popup по нажатию ESC
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);
  return (
    
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-in"  element={<Login name={name} password={password} handleLogin={handleLogin} setName={setName} setPassword={setPassword} handleSubmit={handleSubmit} loggedIn={loggedIn} setIsOpenLogin={setIsOpenLogin} isOpenLogin={isOpenLogin} setIsRegister={setIsRegister}></Login>}/>
          <Route path="/sign-up" element={<Register isRegister={isRegister} setPasswordRegister={setPasswordRegister} passwordRegister={passwordRegister} setNameRegister={setNameRegister} username={username} setIsOpenRegister={setIsOpenRegister} isOpenRegister={isOpenRegister} handleSubmitRegister={handleSubmitRegister} setIsRegister={setIsRegister}/>} />
          <Route path="/" element={<ProtectedRouteElement element={<Main 
          userData={userData.email}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={onCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards} setLoggedIn={setLoggedIn}/>} loggedIn={loggedIn}/>} />
          </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="close"
          title="Вы уверены?"
          button="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
