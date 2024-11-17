require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const hash = require("../utils/hash");
const HTTP_STATUS = require('../utils/utils')

const { NODE_ENV, JWT_SECRET, DEV_SECRET } = process.env;
const User = require("../models/usersModels");


module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
      }

      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsersById = (req, res, next) => {
  const { _id } = req.params;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: "User ID is missing" });
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");
  const payload = jwt.verify(token, JWT_SECRET || DEV_SECRET);
  req.user = payload;

  User.findById(payload._id)
    .select("-password")
    .then((currentUser) => {
      if (!currentUser) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
      }

      res.status(200).send({ user: currentUser });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: "User ID is missing" });
      }
      next(err);
    });
};

module.exports.addUsers = (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassowrd = hash.createHash(password);

  User.create({ email, password: hashedPassowrd })
    .then((user) => {
      if (!user) {
        const error = new Error("Validation error");
        error.status = 400;
        next(error);
      }
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).send({ data: userObject });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `Erro de validação: ${err.message}` });
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const userId = req.params._id;

  User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .select("-password")
    .then((user) => {
      if (!user) {
        const error = new Error("User ID not found");
        error.status = 404;
        return next(error);
      }
      return res.send({ user });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const validationError = new Error("Erro de validação");
        validationError.status = 400;
        return validationError;
      }
      return next(error);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.params._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .select("-password")
    .then((user) => {
      if (!user) {
        const error = new Error("Erro de validação.");
        error.status = 404;
        return next(error);
      }

      return res.send({ user });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const validationError = new Error("Erro de validação");
        validationError.status = 400;
        return validationError;
      }
      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : DEV_SECRET,
        { expiresIn: "7d" },
      );
      res.status(200).send({ data: token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};
