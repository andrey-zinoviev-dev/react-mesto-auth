import React from 'react';
import { useHistory } from 'react-router-dom';
import headerLogo from '../images/Vector.svg';
import headerMenu from '../images/Group_5.png';
import closeSign from '../images/Close-icon.png';
function Header(props) {
    const history = useHistory();
    let loginType;
    let hideUser;
    const [showUser, setShowUser] = React.useState(false);
    // let showUser = false;
    if(props.type === "/sign-in") {
        loginType = true;
    }
    if(props.type === "/sign-up") {
        loginType=false;
    }
    function handleLogout() {
        localStorage.removeItem('token');
        history.push('/');
    }
    if(props.width <= 767) {
        hideUser = true;
    }
    function handleShowUser() {
       return setShowUser(!showUser);
    }
    
    return (
        <header className="header">
            {showUser && hideUser ? <div className="header__showedUser"><span>{props.user}</span><a className="header__action header__action_loggedIn" href="/" onClick={props.loggedIn ? handleLogout: ""}>{props.loggedIn ? "Выйти" : loginType ? "Регистрация" : "Войти"}</a></div> : ""}
            <div className="header__wrapper">
                <img className="header__logo" src={headerLogo} alt="Логотип Место" />
                <div className="header__user-action">
                    {hideUser ? <img className="header__user-action-close" src={!showUser ? headerMenu : closeSign} alt="" onClick={handleShowUser}/> : ""}
                    {!hideUser ? <span className="header__user-action-email">{props.user}</span> : ""}
                    {props.loggedIn && !hideUser ? <a className="header__action header__action_loggedIn" href="/" onClick={handleLogout}>Выйти</a> : ""}
                    {!props.loggedIn && !hideUser ? <a className="header__action" href={loginType? "/sign-up" : "/sign-in"}>{loginType ? "Регистрация" : "Войти"}</a> : "" }
                </div>
            </div>
        </header>
    )
}

export default Header;