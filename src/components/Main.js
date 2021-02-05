import React from 'react';

import userEditSign from '../images/user-edit-sign.png';

import profileEditSign from '../images/Vector-edit.png';

import addCardSign from '../images/Vector.png';

import Card from './Card.js';

import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main (props) {

    const user = React.useContext(CurrentUserContext);
    return (
        <main className="content">
        <section className="profile">
                <div className="profile__image-wrapper">
                    <img className="profile__avatar" src={user ? (user.avatar) : ("")}/>
                    <img className="profile__avatar-edit-sign" onClick={props.onEditAvatar} alt="конпка редактирования профиля" src={userEditSign}/>
                    <div className="profile__avatar-overlay"></div>
                </div>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__heading">{user ? (user.name) : ("")}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}><img className="profile__edit-button-sign" src={profileEditSign}  alt="изменить пользователя" /></button>
                    </div>
                    <p className="profile__subtitle">{user ? (user.about) : ("")}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}><img className="profile__add-button-sign" src={addCardSign} alt="Добавить картинку"/></button>
        </section>
        <section className="elements">
                <ul className="elements__list">
                    {props.cards ? props.cards.map((card, i) => (
                        <Card key={card._id} onLikeClick={props.onCardLike} name={card.name} link={card.link} likes={card.likes.length ? card.likes.length : 0 } onCardClick={props.onCardClick} card={card} onDeleteClick={props.onCardDelete} />
                    )) : ""}
                </ul>
        </section>
      </main>
    )
}

export default Main;