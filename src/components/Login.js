import React from 'react';
import { login, authentificateOnLoad  } from '../utils/mestoAuth';
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
        login(formData)
        .then((res) => {
            if(res.token) {
                props.handleLogin();
                const token = localStorage.getItem('token');
                authentificateOnLoad(token).then((res) => {
                    props.showUser(res.data.email);
                })
                history.push('/');
           }
           
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
                <input className="popup__input popup__input_order_first register__input" type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" />
                <span id="username-input-error" className="popup__input-error-message register__input-error-span"></span>
                <input className="popup__input popup__input_order_second register__input" type="password" name="password" placeholder="Пароль" onChange={handleChange} autoComplete="off" />
                <span id="occupation-input-error" className="popup__input-error-message popup__input-error-message_order_second register__input-error-span"></span> 
                <button className="register__form-submit" type="submit">Войти</button>
            </form>
            <a href="/sign-up" className="register__redirect">Еще не зарегистрированы? Регистрация</a>
        </section>
    )
}