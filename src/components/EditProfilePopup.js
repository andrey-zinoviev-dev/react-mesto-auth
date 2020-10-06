import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export function EditProfilePopup(props) {

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleSubtitleChange(e) {
        setDescription(e.target.value);
    }

    const user = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
       if(user === undefined) {
        return
       } else {
        setName(user.name);
        setDescription(user.about);
       }

    }, [user])

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        })
    }
    

    return (
        <PopupWithForm name="popup" title="Редактировать профиль" formClass="popup__form_type_user-edit" submitButtonClass="" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} closePopups={props.closePopups} onSubmit={handleSubmit} dataLoading={props.dataLoading}>
            <>
                <input id="username-input" value={name} className="popup__input popup__input_order_first" name="username" type="text" required minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-я -]{2,40}" autoComplete="off" onChange={handleNameChange} />
                <span id="username-input-error" className="popup__input-error-message"></span>
                <input id="occupation-input" value={description} className="popup__input popup__input_order_second" name="occupation" type="text" required minLength="2" maxLength="200" pattern="[A-Za-zА-Яа-я -]{2,30}" autoComplete="off" onChange={handleSubtitleChange} />
                <span id="occupation-input-error" className="popup__input-error-message popup__input-error-message_order_second"></span> 
            </>
        </PopupWithForm>
    )
}


