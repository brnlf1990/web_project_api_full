import React, {  useState, useContext } from "react";
import "../blocks/Pages.css";
import Main from "../components/Main";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import {
  CurrentUserContext
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
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const {currentUser, setCurrentUser} =useContext(CurrentUserContext)
  const { cards, setInitialCards } = useContext(CardContextRender);
 
 
  

  const handleCardLike = React.useCallback((card) => {

    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (isLiked) {

      api.dislikeCard(card._id, currentUser._id).then((updatedCard) => {
       return setInitialCards((prevCards) =>
          prevCards.map((c) => (c._id === card._id ? updatedCard : c))
        );
      });
    } else {
      api.likeCard(card._id, currentUser._id).then((updatedCard) => {
       return setInitialCards((prevCards) =>
          prevCards.map((c) => (c._id === card._id ? updatedCard : c))
        );
      });
    }
  }, [currentUser._id]);

  

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

    api
      .patchUserInfo(currentUser._id,{ name, about })
      .then((updatedUser) => {

        setCurrentUser(updatedUser.user);

        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleUpdateAvatar = ( { avatar }) => {
    api
      .userAvatar(currentUser._id,{ avatar })
      .then((updateAvatar) => {
        
        setCurrentUser(updateAvatar);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
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
  );
}

export default MainPage;
