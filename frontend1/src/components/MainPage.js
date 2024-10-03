import React, { useEffect, useState, useContext } from "react";
import "../blocks/Pages.css";
import Main from "../components/Main";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import {
  CurrentUserContext,
  currentUser as fetchCurrentUser,
} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CardContextRender } from "../contexts/CardContextRender";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmation from "./DeleteConfirmationPopup";

function MainPage() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isDeletePopup, setDeletePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const { cards, setInitialCards } = useContext(CardContextRender);

  useEffect(() => {
    fetchCurrentUser(setCurrentUser);

    api
      .getInitialCards()
      .then((initialCards) => {
        setInitialCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setInitialCards]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setInitialCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardDelete = (cardToDelete) => {
    api
      .deleteCard(cardToDelete.card._id)
      .then(() => {
        setInitialCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardToDelete.card._id)
        );
        setDeletePopup(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeletePopup = (card) => {
    setCardToDelete(card);
    setDeletePopup(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletePopup(false);
    setCardToDelete(null);
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .postNewCard({ name, link })
      .then((newCard) => {
        setInitialCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateUser = ( { name, about }) => {
console.log(fetchCurrentUser._id);

    api
      .patchUserInfo({ name, about })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .userAvatar({ avatar })
      .then((updateAvatar) => {
        setCurrentUser(updateAvatar);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletePopup}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <DeleteConfirmation
            isOpen={isDeletePopup}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            card={cardToDelete}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default MainPage;
