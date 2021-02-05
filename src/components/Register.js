import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
// import { register } from '../utils/mestoAuth';
import { api } from '../utils/api';
export function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [validEmail, setValidEmail] = React.useState(false);
    const [validPassword, setValidPassword] = React.useState(false);
    const history = useHistory();
    const { url } = useRouteMatch();
    let submitButtonisInactive = true;
    function handleChange(event) {
        validateForm();
        const { name, value } = event.target;
        if(name === "email") {
            setEmail(value);   
            if(event.target.validity.valid) {
                setValidEmail(true);
            }  
        }
        if(name === "password") {
            setPassword(value);
            if(event.target.validity.valid) {
                setValidPassword(true);
            }
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        api.register(email, password)
        .then((res) => {
            if(res) {
                props.handleRegistrationSubmit();
                props.isRegistered();
                history.push('/sign-in');
            }
        })
        .catch((err) => {
            props.handleRegistrationSubmit();
            console.log(`Произошла ошибка при регистрации, проверьте пароль или почту`);
        })
    }
    React.useEffect(() => {
        props.setTypeOfHeader(url);
    }, [])

    function validateForm() {
        if(validEmail && validPassword) {
            submitButtonisInactive = false;
        } else {
            submitButtonisInactive = true;
        }
    }
    validateForm();
    return (
        <section className="register">
            <h2 className="register__heading">Регистрация</h2>
            <form className="popup__form_type_addCard-form" onSubmit={handleFormSubmit}>
                <input className="popup__input popup__input_order_first register__input" type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' minLength="2"/>
                <span id="username-input-error" className="popup__input-error-message register__input-error-span"></span>
                <input className="popup__input popup__input_order_second register__input" type="password" name="password" placeholder="Пароль" onChange={handleChange} minLength="2" required/>
                <span id="occupation-input-error" className="popup__input-error-message popup__input-error-message_order_second register__input-error-span"></span> 
                <button className= {submitButtonisInactive? "register__form-submit popup__edit-button_inactive" : "register__form-submit"} type="submit" disabled={submitButtonisInactive ? true : false}>Зарегистрироваться</button>
            </form>
            <a href="/sign-in" className="register__redirect">Уже зарегистрированы? Войти</a>
        </section>
    )
}