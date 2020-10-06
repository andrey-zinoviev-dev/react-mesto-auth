import React from 'react';

import Header from './Header.js';

import Main from './Main.js';

import Footer from './Footer.js';

import PopupWithImage from './PopupWithImage.js';

import { api } from '../utils/api.js';

import {CurrentUserContext} from "../contexts/CurrentUserContext";

import {EditProfilePopup} from "./EditProfilePopup";

import {EditAvatarPopup} from "./EditAvatarPopup";

import {DeleteCardPopup} from "./DeleteCardPopup";

import {AddCardPopup} from "./AddCardPopup";

import { Route, Switch, Redirect, useHistory } from 'react-router-dom'; 

import {Login} from './Login';

import {Register} from './Register';

import {InfoToolTip} from './InfoTooltip';

import ProtectedRoute from './ProtectedRoute';

import { authentificateOnLoad } from '../utils/mestoAuth';

function App() {

  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState();

  const [deletingCard, setDeletingCard] = React.useState();

  const [dataIsLoading, setDataIsLoading] = React.useState(false);
  //вот этот параметр отвечает за допуск к авторизированному роуту /
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [registered, setRegistered] = React.useState(false);

  const [registrationStatusToggle, setRegistrationStatusToggle]= React.useState(false);

  const [authentificatedUser, setAuthentificatedUser] = React.useState('');

  const [headerType, setHeaderType] = React.useState("");

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function getDataFromServer() {
    api.getUser()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    getDataFromServer();
  },[])

  function handleUpdateUser(data) {
    setDataIsLoading(true);
    api.editProfile(data)
    .then((data) => {
      setDataIsLoading(false);
      setCurrentUser(data);
      closeAllPopups();
    })
    
  }

  function handleAvatarUpdate(link) {
    setDataIsLoading(true);
    api.updateAvatar(link)
    .then((data) => {
      setDataIsLoading(false);
      setCurrentUser(data);
      closeAllPopups();
    })
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
      function getCardsFromServer () {
          api.getInitialCards()
          .then((data) => {
              setCards(data);
          })
          .catch((err) => {
              console.log(err);
          });
      }

      getCardsFromServer();
  }, [])

  function handleCardLike(card) {
      let isLiked = card.likes.some((like) => {return like._id === currentUser._id})
      if(!isLiked) {
          api.setLike(card._id)
          .then((data) => {
          const newCards = cards.map((oldCard) => {
              return oldCard._id === data._id ? (data) : (oldCard)
          })
          setCards(newCards);
          isLiked = !isLiked;
      })} else {
          api.removeLike(card._id)
          .then((data) => {
              const newCards = cards.map((oldCard) => {
                  return oldCard._id === data._id ? (data) : (oldCard)
              })
              setCards(newCards);
              isLiked = !isLiked;
          })
      }
  }

  function handleDeleteCardClick(card) {
      setDeletingCard(card._id);
      setIsDeleteCardPopupOpen(true);
  }

  function handleCardDelete(id) {
    setDataIsLoading(true);
    api.deleteCard(id)
    .then((data) => {
      setDataIsLoading(false);
      const newCards = cards.filter((card) => {
        return card._id!==id;
      })
      setCards(newCards);
      closeAllPopups();
    })
  }

  function handleAddCard(card) {
    setDataIsLoading(true);
    api.addCard(card)
    .then((data) => {
      setDataIsLoading(false);
      setCards([...cards, data]);
      closeAllPopups();
    })
  }

  function handleCloseRegistrationPopup() {
    setRegistrationStatusToggle(false);
  }
  function handleRegistrationSubmit() {
    setRegistrationStatusToggle(true);
  }
  function switchRegistrationMessage() {
    setRegistered(true);
  }
  function enableLoggedInState() {
    setLoggedIn(true);
  }

  function identifyHeaderType(data) {
    setHeaderType(data);
  }

  function showUser(data) {
    setAuthentificatedUser(data);
  }
  React.useEffect(() => {
    if(localStorage.getItem('token')) {
      const userToken = localStorage.getItem('token');
      authentificateOnLoad(userToken)
      .then((res) => {
        if(res) {
          enableLoggedInState();
          setAuthentificatedUser(res.data.email)
          history.push('/');
        }
      })
    }
  }, [loggedIn])

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    })
  }, [windowWidth]);

  return (
    <div className="root">
      <div className="container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} user={authentificatedUser} type={headerType} width={windowWidth}/>
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteCardClick} />
              <Route path="/sign-in">
                <Login handleLogin={enableLoggedInState} setTypeOfHeader={identifyHeaderType} showUser={showUser}/>
              </Route>
              <Route path="/sign-up">
                <Register handleRegistrationSubmit={handleRegistrationSubmit} isRegistered={switchRegistrationMessage} setTypeOfHeader={identifyHeaderType}/>
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} closePopups={closeAllPopups} onUpdateUser={handleUpdateUser} dataLoading={dataIsLoading} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} closePopups={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} dataLoading={dataIsLoading} />
          <AddCardPopup isOpen={isAddCardPopupOpen} closePopups={closeAllPopups} onAddCard={handleAddCard} dataLoading={dataIsLoading} />
          <DeleteCardPopup deleteCard={deletingCard} isOpen={isDeleteCardPopupOpen} closePopups={closeAllPopups} onDeleteCard={handleCardDelete} dataLoading={dataIsLoading} />
          <PopupWithImage card={selectedCard} closePopups={closeAllPopups}/>
          <InfoToolTip isRegistered={registered} registeredPopup={registrationStatusToggle} closeRegistrationPopup={handleCloseRegistrationPopup} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
