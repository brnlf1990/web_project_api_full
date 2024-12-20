const mongoose = require("mongoose");
const Cards = require("../models/cardsModels");
const HTTP_STATUS = require('../utils/utils');


module.exports.getCards = (req, res, next) => {
  const { authorization } = req.headers;


  Cards.find({})
    .then((card) => {
      if (!card) {
        const error = new Error("Cards not found");
        error.status = 404;
        return next(error);
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Cards.create({ name, link, owner: userId })
    .then((card) => res.status(HTTP_STATUS.CREATED).send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError && err.errors.owner) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: `${err}` });
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(HTTP_STATUS.NOT_FOUND).send({ message: `${err}` });
      }

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: `Error ${err}` });
    });
};

module.exports.deleteCard = (req, res, next) => {
  const currentUserId = req.user._id;

  Cards.findById(req.params._id)
    .then((card) => {
      if (!card) {
        const error = new Error("Card not found");
        error.status = 404;
        return next(error);
      }
      if (currentUserId !== card.owner.toString()) {
        const error = new Error("Permission denied");
        error.status = 403;
        return next(error);
      }
      return Cards.findByIdAndDelete(req.params._id).then((deletedCard) => {
        res.send({ data: deletedCard });
      });
    })
    .catch((err) => {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: `Error ${err}` });
    });
};

module.exports.likeCard = (req, res, next) => {
  const cardId = req.params._id;
  const { userId } = req.body;

  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .populate("likes")
    .then((card) => {
      console.log(card);

      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: "ID do cartão inválido" });
      }
      if (err.statusCode === 404) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: `Erro no servidor: ${err.message}` });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(`Error ${err}`);
    });
};

module.exports.dislike = (req, res, next) => {
  const cardId = req.params._id;
  const { userId } = req.body;

  Cards.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: "Card ID or User ID is missing" });
      }

      return res.status(500).send(`Error ${err}`);
    });
};
