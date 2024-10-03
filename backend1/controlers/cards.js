
const Cards = require("../models/cardsModels");
const mongoose = require("mongoose");
const {getCurrentUser} = require('./users')

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
};
module.exports.getCards = (req, res, next) => {

  Cards.find({})
    .then((card) =>{
      if (!card){
        const error = new Error("Cards not found")
        error.status = 404
        next(error)
      }

      res.send({ data: card })})
    .catch((next));
};

module.exports.addCard = (req, res, next) => {
  const { name, link, owner } = req.body;

  Cards.create({ name, link, owner})
    .then((card) => {

      res.status(HTTP_STATUS.CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError && err.errors.owner) {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: `${err}` });
      } else if (err instanceof mongoose.Error.ValidationError)
        [res.status(HTTP_STATUS.NOT_FOUND).send({ message: `${err}` })];
      else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send({ message: `Error ${err}` });
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const currentUserId = req.user._id

Cards.findById(req.params._id)
.then((card) => {

  if (!card){
    throw new Error("Card not found");
  }
  if (currentUserId !== card.owner.toString() ){
    throw new Error("Permission denied");
  }
  return Cards.findByIdAndDelete(req.params._id)
  .then((deletedCard) => {

    res.send({ data: deletedCard })

})
})
.catch((err) => {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: `Error ${err}` });
    });
};

module.exports.likeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.body.userId;

  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: "ID do cartão inválido" });
      } else if (err.statusCode === 404) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: `Erro no servidor: ${err.message}` });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(`Error ${err}`);
      }
    });
};

module.exports.dislike = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.body.userId;

  Cards.findByIdAndDelete(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send({ message: "Card ID or User ID is missing" });
      }

      res.status(500).send(`Error ${err}`);
    });
};
