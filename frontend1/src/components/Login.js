import React, { useContext } from "react";
import "../blocks/Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "../components/InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Login({ handleLoggedIn }) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRegistred, setIsRegistred] = React.useState(false);
  const location = useLocation();
  const [errorMessage, setErrorMessage] = React.useState("");
  const {setCurrentUser} = useContext(CurrentUserContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      setErrorMessage("Email ou senha invalido, por favor verifique os campos.");
      return;
    }

    auth
      .autorization(formData)
      .then((data) => {
        if (data) {
          setCurrentUser(data)
          localStorage.setItem("token", data.data);
          navigate("/cards");
          handleLoggedIn();
        }
      })
      .catch((err) => {
        console.log(err);
        
      });
  };

  React.useEffect(() => {
    if (location.state){
      setIsModalOpen(true);
      setIsRegistred(true);

    }
    return

  },[location])

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Entrar</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            className="login__email"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            onChange={handleChange}
            className="login__passowrd"
          />
          <span className="login__error-message">{errorMessage}</span>
          <button className="login__button" type="submit">
            Entrar
          </button>
          <p className="login__register">
            Ainda não é membro? Inscreva-se <Link to="/signup">aqui!</Link>
          </p>
        </form>
      </div>
      {isModalOpen && (
          <InfoTooltip isRegistred={isRegistred} onClose={handleCloseModal} />
        )}
    </div>
  );
}

export default Login;
