import React from "react";

import PopupWithForm from "./PopupWithForm";

export function AddCardPopup(props) {

    const [name ,setName] = React.useState('');

    const [link, setLink] = React.useState('');

    const [nameError, setNameError] = React.useState(true);

    const [linkError, setLinkError] = React.useState(true);

    // const [submitButtonState, setSubmitButtonState] = React.useState(true);

    let submitButtonIsInactive = true;

    function handleNameChange(event) {
        validateForm();
        setName(event.target.value);
        // validateForm();
        if(!event.target.validity.valid) {
            setNameError(event.target.validationMessage);
        } else {
            setNameError();
        }
       
    }

    function handleLinkChange(event) {
        validateForm();
        setLink(event.target.value);
        // validateForm();
        if(!event.target.validity.valid) {
            setLinkError(event.target.validationMessage);
        } else {
            setLinkError();
        }   
        
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.target.reset();
        props.onAddCard({
            name: name,
            link: link,
        });

    }

    function validateForm() {
        if(!nameError && !linkError) {
            submitButtonIsInactive =  false;
            console.log(submitButtonIsInactive);
        } else {
            submitButtonIsInactive = true;
            console.log(submitButtonIsInactive);
        }
    }

    validateForm();
    
    return (
        <PopupWithForm submitButtonState={submitButtonIsInactive} name='popup_addCard' title="Новое место" formClass="popup__form_type_addCard-form" submitButtonClass="popup__edit-button_action_addCard" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} closePopups={props.closePopups} onSubmit={handleSubmit} dataLoading={props.dataLoading}>
            <>
                <input id="place-name-input" className="popup__input popup__input_order_first popup__input_place-name" name="place-name" type="text" placeholder="Название" required minLength="1" maxLength="30" autoComplete="off" onChange={handleNameChange} />
    <span id="place-name-input-error" className="popup__input-error-message">{nameError}</span>
                <input id="palce-image-link-input" className="popup__input popup__input_order_second popup__input_image-link" name="palce-image-link" placeholder="Ссылка на картинку" required type="url" autoComplete="off" onChange={handleLinkChange} />
    <span id="palce-image-link-input-error" className="popup__input-error-message popup__input-error-message_order_second">{linkError}</span>
            </>
        </PopupWithForm>
    )
    
}