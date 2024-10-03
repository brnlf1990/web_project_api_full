import "../blocks/Register.css";
import { Link, useNavigate  } from "react-router-dom";
import React from "react";
import * as auth from "../utils/auth";
import InfoTooltip from "../components/InfoTooltip";


function Register() {

  const [isModalOpen, setIsModalOpen] = React.useState(false); 
  const [isRegistred, setIsRegistred] = React.useState(false);
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
    auth
      .register(formData).then((response) =>{
        if (response){
          setIsModalOpen(true);
          setIsRegistred(true)
          navigate('/signin')
        }else{
          setIsModalOpen(false);
          setIsRegistred(false)
        }
      })
      .catch((err) =>{
        console.log(`${err}`)
        setIsRegistred(false)
        setIsModalOpen(true);
      }
      );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };
  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__title">Inscreva-se </h2>
        <form className="register__form">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="register__email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            className="register__password"
          />

          <button onClick={handleSubmit} className="register__button">
            Inscreva-se
          </button>
          <p className="register__login">
            Já é um membro? <Link to="/signin">Faça o login aqui!</Link>
          </p>
        </form>
      </div>

      {isModalOpen && (
        <InfoTooltip isRegistred={isRegistred} onClose={handleCloseModal} />
      )}
    </div>
  );
}
export default Register;
