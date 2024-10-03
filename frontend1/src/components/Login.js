import React from "react";
import "../blocks/Login.css";
import { Link,  useNavigate  } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({handleLoggedIn}) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate ()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === '' || formData.password ==='' ||  formData.status === 400){
      console.log('Email ou senha invalido, por favor verifique os campos.')
      return
    }
    
    auth
      .autorization((formData.email, formData.password).then((data) => {
       
        if (data.token){
          handleLoggedIn()
          localStorage.setItem("token", data.token)
          navigate('/main')
        }
      })
      .catch((err) =>
        console.log(`${err}`)
      )) 
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Entrar</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <input placeholder="E-mail" onChange={handleChange} className="login__email" />
          <input type="password" placeholder="Senha" onChange={handleChange} className="login__passowrd" />

          <button className="login__button" type="submit">Entrar</button>
          <p className="login__register">
            Ainda não é membro? Inscreva-se <Link to="/signup">aqui!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
