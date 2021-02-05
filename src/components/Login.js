import React from 'react';
// import { login, authentificateOnLoad  } from '../utils/mestoAuth';
import { api } from '../utils/api';
import { useHistory, useRouteMatch } from 'react-router-dom';

export function Login(props) {
    const [formData, setFormData] = React.useState({ email:"", password: ""})
    const history = useHistory();
    const { url } = useRouteMatch();
    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }
    function handleSubmit(event) {
        event.preventDefault();
        api.login(formData)
        .then((res) => {
            if(!res) {
                console.log('Произошла ошибка при регистрации');
            }
            localStorage.setItem('token', res.payload);
            return res;
        })
        .then((res) => {
            props.handleLogin();
            const token = localStorage.getItem('token');
            api.getUser(token)
            .then((res) => {
                props.showUser(res);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                // props.handleRegistrationSubmit();
            })
        })
        .catch((err) => {
            console.log(err);
            props.resetSuccessPopup();
            props.handleRegistrationSubmit();
        })
    }
    //вот тут менять стейт!!!
    React.useEffect(() => {
        props.setTypeOfHeader(url);
    }, [])
    return (
        <section className="register">
            <h2 className="register__heading">Вход</h2>
            <form className="popup__form_type_addCard-form" onSubmit={handleSubmit}>
                <input className="popup__input popup__input_order_first register__input" type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' />
                <span id="username-input-error" className="popup__input-error-message register__input-error-span"></span>
                <input className="popup__input popup__input_order_second register__input" type="password" name="password" placeholder="Пароль" onChange={handleChange} autoComplete="off" />
                <span id="occupation-input-error" className="popup__input-error-message popup__input-error-message_order_second register__input-error-span"></span> 
                <button className="register__form-submit" type="submit">Войти</button>
            </form>
            <a href="/sign-up" className="register__redirect">Еще не зарегистрированы? Регистрация</a>
        </section>
    )
}