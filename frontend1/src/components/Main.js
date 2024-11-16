import React from "react";
import "../blocks/Profile.css";
import "../blocks/Cards.css";
import profileEditButton from "../images/avatarPencil.png";
import cardAddButton from "../images/add__button_icon.jpg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContextRender } from "../contexts/CardContextRender";
import api from "../utils/api";
function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
  const { cards, setInitialCards } = React.useContext(CardContextRender);
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        
        setInitialCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setInitialCards]);

  

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar" onClick={onEditAvatarClick}>
            <img
              src={currentUser.avatar || profileEditButton}
              alt="profile avatar"
              className="profile__avatar-image"
            />
          </div>
          <div className="profile__info">
            <h2 className="profile__info-name" id="profile__info_name">
              {currentUser.name || "Nome"}
            </h2>
            <h3 className="profile__info-content" id="profile__info_content">
              {currentUser.about || "Sobre mim"}
            </h3>
          </div>
          <button
            className="profile__info-edit-button"
            onClick={onEditProfileClick}
          >
            <img
              src={profileEditButton}
              alt="Edit profile"
              className="profile__info-edit-button-image"
            />
          </button>
          <button className="profile__add-button" onClick={onAddPlaceClick}>
            <img
              src={cardAddButton}
              alt="Add card"
              className="profile__add-button-icon"
            />
          </button>
        </div>
      </section>
      <section className="templates">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={card._id || index}
              card={card}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
            />
          ))
        ) : (
          <p>No cards available</p>
        )}
      </section>
    </main>
  );
}

export default Main;
