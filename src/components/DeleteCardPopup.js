import React from 'react';

import PopupWithForm from './PopupWithForm.js';

export function DeleteCardPopup(props) {

    function submitDeleteCard(event) {
        event.preventDefault();
        props.onDeleteCard(props.deleteCard);
    }
    
    return (
        <PopupWithForm onSubmit={submitDeleteCard} name="popup_delete-image" title="Вы уверены?" formClass="popup__form_type_delete-card" submitButtonClass="" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} closePopups={props.closePopups} dataLoading={props.dataLoading} />
    )
}