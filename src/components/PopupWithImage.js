import React from 'react';

import popupCloseSign from '../images/Close-icon.png';

function PopupWithImage(props) {
    return (
        <section className= {props.card ? ("popup popup_picture popup_opened") : ("popup popup_picture")}>
            <div className="popup__container popup__container_type_image">
                <button type="button" className="popup__close popup__close_type_open-image" onClick={props.closePopups}><img className="popup__close-sign" src={popupCloseSign} alt="закрыть окно" /></button>
                <img className="popup__image" alt="" src={props.card ? (props.card.link) : ("")}/>
    {/* <p className="popup__image-text"></p> */}{props.card !== null ? (<p className="popup__image-text">{props.card.name}</p>) : (<p className="popup__image-text"></p>)}
            </div>
            <div className="popup__overlay popup__overlay_type_image"></div>
        </section>
    )
}

export default PopupWithImage;