import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link, useLocation,useNavigate  } from "react-router-dom";
import "../blocks/Header.css";
import aroundImage from "../images/header_title.jpg";

function Header({handleLogOut, formData}) {
  const location = useLocation();
  const {currentUser} = React.useContext(CurrentUserContext)
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
    case "/cards":
        return  (
          <span  >{currentUser.email}</span>
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
        <span className="header__logout" onClick={signOut}>Sair</span>

      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
