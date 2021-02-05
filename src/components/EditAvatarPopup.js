import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

export function EditAvatarPopup(props) {
    
    const linkRef = React.useRef();
    let formSubmitButtonInactive = true;
    const [linkError, setLinkError] = React.useState("");
    function linkInputChange() {
        formValidate();
        if(!linkRef.current.validity.valid) {
            setLinkError(linkRef.current.validationMessage);
        } else {
            setLinkError("");
        }
    }
    function handleAvatarUpdate(event) {
        event.preventDefault();
        props.onUpdateAvatar({
            avatar: linkRef.current.value
        })
        event.target.reset();
    }
    function formValidate() {
        if(!linkError) {
            formSubmitButtonInactive = false;
        } else {
            formSubmitButtonInactive = true;
        }
        
    }
    formValidate();
    return (
        <PopupWithForm submitButtonState={formSubmitButtonInactive} name="popup_avatar-edit" title="Обновить аватар" formClass="popup__form_type_change-avatar" submitButtonClass="" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} closePopups={props.closePopups} onSubmit={handleAvatarUpdate} dataLoading={props.dataLoading}>
          <>
            <input ref={linkRef} type="url" className="popup__input popup__input_type_avatar-link" name="avatar-link" id="avatar-link-input" placeholder="Ссылка на картинку" required autoComplete="off" pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+=]+$" onInput={linkInputChange}/>
            <span className="popup__input-error-message" id="avatar-link-input-error">{linkError}</span>
          </>
        </PopupWithForm>
    )
}
