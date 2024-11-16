import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../blocks/Header.css";
import aroundImage from "../images/header_title.jpg";

function Header({ handleLogOut }) {
  const location = useLocation();
  const { currentUser } = React.useContext(CurrentUserContext);
  const navigate = useNavigate();

  function signOut() {

    localStorage.removeItem("token");
    handleLogOut();

    navigate("/signin");
  }
  const getButtonText = () => {
    switch (location.pathname) {
      case "/signup":
        return <Link to="/signin"> Faça o Login</Link>;
      case "/signin":
        return <Link to="/signup"> Entrar</Link>;
      case "/cards":
        return <span>{currentUser.email}</span>;
    }
  };
  const shouldShowLogout =
    location.pathname !== "/signin" && location.pathname !== "/signup";
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={aroundImage}
          alt="header title image"
          className="header__image"
        />
        <p className="header__enter-button">{getButtonText()}</p>
        {shouldShowLogout && (
          <span className="header__logout" onClick={signOut}>
            Sair
          </span>
        )}
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
