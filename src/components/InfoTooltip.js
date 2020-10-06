import React from 'react';
import regSuccessImage from '../images/registration-successful.png';
import regFailureImage from '../images/registration-failure.png';
import closePopupButton from '../images/Close-icon.png';
export function InfoToolTip(props) {

    function handleCloseButtonClick() {
        props.closeRegistrationPopup();
    }
    return (
        <section className={props.registeredPopup ? "popup popup_info popup_opened" : "popup popup_info"}>
            <div className="popup__container popup__container_type_regsitration">
            <button type="button" className="popup__close popup__close_type_registration" onClick={handleCloseButtonClick}><img className="popup__close-sign popup__close-sign_registration" src={closePopupButton} alt="закрыть окно" /></button>
                <img className="popup__registration-status" src={props.isRegistered ? regSuccessImage : regFailureImage} alt=""></img>
                <h4 className="popup__registration-message">{props.isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}</h4>
            </div>
            <div className="popup__overlay"></div>
        </section>
    )
}