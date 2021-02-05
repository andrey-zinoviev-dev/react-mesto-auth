import React from 'react';

import deleteSign from '../images/delete_icon.png';

import likeSign from '../images/like.svg';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card (props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = props.card.owner === currentUser._id;
    console.log(isOwn);
    let isLiked = props.card.likes.some((like) => {return like._id === currentUser._id});
    
    function handleClick() {
        props.onCardClick(props.card);
    }
    
    function handleLikeClick() {
        props.onLikeClick(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteClick(props.card);
    }

    return (
        <li className="elements__element">
            <img className={isOwn ? ("elements__element-delete-sign") : ("elements__element-delete-sign_deactivated")} src={deleteSign} alt="удалить" onClick={handleDeleteClick}/>
            <img className="elements__element-photo" alt="" src={props.link} onClick={handleClick}/>
            <div className="elements__element-rectangle">
                <p className="elements__element-text">{props.name}</p>
                <div className="elements__element-like-count">
                    <button type="button" className="elements__element-like" onClick= {handleLikeClick}><img className={isLiked ? ("elements__element-like-sign_status_active") : ("elements__element-like-sign")} src={likeSign} alt="лайк" /></button>
                    <span className="elements__element-like-number">{props.likes}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;