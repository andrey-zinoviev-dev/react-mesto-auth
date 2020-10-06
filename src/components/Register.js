import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { register } from '../utils/mestoAuth';
export function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    const { url } = useRouteMatch();
    function handleChange(event) {
        const { name, value } = event.target;
        if(name === "email") {
            setEmail(value);
        }
        if(name === "password") {
            setPassword(value);
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        
        register(email, password).then((res) => {
            if(res.data) {
                props.handleRegistrationSubmit();
                props.isRegistered();
                history.push('/sign-in');
            } else {
                props.handleRegistrationSubmit();
                console.log('Произошла ошибка при регистрации');
            }
        })
    }
    React.useEffect(() => {
        props.setTypeOfHeader(url);
    }, [])
    return (
        <section className="register">
            <h2 className="register__heading">Регистрация</h2>
            <form className="popup__form_type_addCard-form" onSubmit={handleFormSubmit}>
                <input className="popup__input popup__input_order_first register__input" type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off"/>
                <span id="username-input-error" className="popup__input-error-message register__input-error-span"></span>
                <input className="popup__input popup__input_order_second register__input" type="password" name="password" placeholder="Пароль" onChange={handleChange} />
                <span id="occupation-input-error" className="popup__input-error-message popup__input-error-message_order_second register__input-error-span"></span> 
                <button className="register__form-submit" type="submit">Зарегистрироваться</button>
            </form>
            <a href="/sign-in" className="register__redirect">Уже зарегистрированы? Войти</a>
        </section>
    )
}