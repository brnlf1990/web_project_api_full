import React from "react";
import closeButton from "../images/Close_Icon.png";
import "../blocks/InfoTooltip.css";
function InfoTooltip({ isRegistred, onClose }) {
  return (
    <div className={"modal"}>
      <div className={`modal__fade ${isRegistred ? "active" : ""}`}></div>
      <form
        className={`${
          isRegistred ? "modal__login-succed" : "modal__login-failed"
        }`}
      >
        <span className="modal__close-button">
          <img
            src={closeButton}
            className="modal__close-image"
            alt="close"
            onClick={onClose}
          />
        </span>
        <h2 className="modal__text">
          {isRegistred
            ? "Vitória! Você conseguiu se registrar"
            : "Ops, algo saiu deu errado! Por favor, tente novamente"}
        </h2>
      </form>
    </div>
  );
}

export default InfoTooltip;
