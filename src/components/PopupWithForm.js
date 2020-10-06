import React from 'react';

import popupCloseSign from '../images/Close-icon.png';

function PopupWithForm(props) {    
    return (
        <section className={props.isOpen ? (`popup ${props.name} popup_opened`) : (`popup ${props.name}`)}>
        <div className="popup__container">
            <h4 className="popup__title">{props.title}</h4>
            <button type="button" className="popup__close" onClick={props.closePopups}><img className="popup__close-sign" src={popupCloseSign} alt="закрыть окно" /></button>
            <form className={`popup__form ${props.formClass}`} action="/" noValidate onSubmit={props.onSubmit}>
                {props.children}
                <button disabled={props.submitButtonState ? (true) : (false)} type="submit" className={props.submitButtonState ? (`popup__edit-button ${props.submitButtonClass} popup__edit-button_inactive`) : (`popup__edit-button ${props.submitButtonClass}`)}>{props.dataLoading ? ("Загрузка...") : (props.submitButtonText)}</button>
            </form>
        </div>
        <div className="popup__overlay"></div>
      </section>
    )
}

export default PopupWithForm;