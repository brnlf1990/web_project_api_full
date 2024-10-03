import React from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom";
import "../blocks/Header.css";
import aroundImage from "../images/header_title.jpg";

function Header({handleLogOut, formData}) {
  const location = useLocation();

  const navigate = useNavigate ()

  function signOut(){
    handleLogOut();
    localStorage.removeItem('jwt')
    navigate('/signin')
  }
  const getButtonText = () => {
    switch (location.pathname) {
      case "/signup":
        return (
        <Link to="/signin"> Faça o Login
        </Link>
        )
      case "/signin":
        return(
          <Link to="/signup"> Entrar
          </Link>
          ) 
      case "/main":
        return  (
          <span onClick={signOut}>
            Sair
          </span>
        );
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <img
          src={aroundImage}
          alt="header title image"
          className="header__image"
        />
        <p className="header__enter-button">{getButtonText()}</p>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
