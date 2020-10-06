import React from 'react';

class Api extends React.Component {
    constructor({baseUrl, headers}) {
        super({baseUrl, headers});
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    _handleErrorResponse(err) {
        console.log(err.message);
        return Promise.reject(`Ошибка: ${err.message}`);
    }
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleResponse)
    }
    editProfile(formData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.about,
            })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    addCard(formData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                link: formData.link,
                name: formData.name
            })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
   updateAvatar(formData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
           method: 'PATCH',
           headers: this._headers,
           body: JSON.stringify({
               avatar: formData.avatar
           })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
   }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
    headers: {
        authorization: '12f43955-076f-4f9d-b681-082f556a73e2',
        'Content-Type': 'application/json'
    }
})


// export default api;