import React from 'react';
// import { baseUrl } from './mestoAuth';

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
        return Promise.reject(`Ошибка: ${err.message}`);
    }
    getUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(this._handleResponse)
        .catch(this._handleResponse)
    }
    editProfile(formData, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: formData.name,
                about: formData.about,
            })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    addCard(formData, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                link: formData.link,
                name: formData.name
            })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    setLike(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    removeLike(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
    }
    updateAvatar(formData, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
           method: 'PATCH',
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
           body: JSON.stringify({
               avatar: formData.avatar
           })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
   }
   login(formData) {
        return fetch(`${this._baseUrl}/signin`, {
           method: "POST",
           headers: this._headers,
           body: JSON.stringify({
               email: formData.email,
               password: formData.password
           })
       })
       .then(this._handleResponse)
       .catch(this._handleErrorResponse)
   }
   register(email, password ) {
        return fetch(`${this._baseUrl}/signup`, {
           method: 'POST',
           headers: this._headers,
           body: JSON.stringify({
               email: email,
               password: password
           })
        })
        .then(this._handleResponse)
        .catch(this._handleErrorResponse)
   }
//    getCurrentUser(token) {
//         return fetch(`${this._baseUrl}/users/me`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             }
//         })
//         .then(this._handleResponse)
//         .catch(this._handleErrorResponse)
//    }
}

// export const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
//     headers: {
//         authorization: '12f43955-076f-4f9d-b681-082f556a73e2',
//         'Content-Type': 'application/json'
//     }
// })

export const api = new Api({
    baseUrl: 'https://api.scp.students.nomoreparties.space',
    headers: {
        'Content-Type': 'application/json',
    }
})

// export default api;