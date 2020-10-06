export const userEditButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');

export const selectorsObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__edit-button',
    inactiveButtonClass: 'popup__edit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error-message'
};
export const formUserEdit = document.querySelector('.popup__form_type_user-edit');
export const formUserEditInputs = Array.from(formUserEdit.querySelectorAll('.popup__input'));
export const formUserEditSubmitButton = formUserEdit.querySelector('.popup__edit-button');
export const formAddCard = document.querySelector('.popup__form_type_addCard-form');
export const formAddCardInputs = Array.from(formAddCard.querySelectorAll('.popup__input'));
export const formAddCardSubmitButton = formAddCard.querySelector('.popup__edit-button');
export const userNameInput = document.querySelector('.popup').querySelector('.popup__form').querySelector('.popup__input_order_first');
export const userOccupationInput = document.querySelector('.popup').querySelector('.popup__form').querySelector('.popup__input_order_second');
export const avatarElement = ('.profile__avatar');
export const userAvatarEditButton = document.querySelector('.profile__avatar-edit-sign');
export const avatarEditPopupSelector = '.popup_avatar-edit';
export const avatarEditForm = document.querySelector('.popup__form_type_change-avatar');

export function renderLoading(isLoading, event) {
    if(isLoading) {
        event.querySelector('.popup__edit-button').textContent = 'Загрузка...';
    } else {
        event.querySelector('.popup__edit-button').textContent = 'Сохранить';
    }
}

export function cardIsLiked(likes, owner) {
    return likes.some((like) => {
        return like._id === owner._id;
    })
}