require('dotenv').config()
const hash = require('../utils/hash')
const jwt = require("jsonwebtoken")

const {NODE_ENV, JWT_SECRET, DEV_SECRET} = process.env;
const User = require("../models/usersModels");
const mongoose = require("mongoose");
const HTTP_STATUS = {
  NOT_FOUND: 404,
};
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {

      if (!user){
        const error = new Error("User not found")
        error.status = 404
        next(error)
      }

      res.send({ data: user })})
    .catch((err) => {
        next(err)
    });
};

module.exports.getUsersById = (req, res, next) => {
  const { _id } = req.params;

  User.findById(_id)
    .then((user) => {
      if (!user){
        const error = new Error("User not found")
        error.status = 404
        next(error)
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: `User ID is missing` });
      }
      next(err)

    });
};


module.exports.getCurrentUser = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '')
  const payload = jwt.verify(token, JWT_SECRET || DEV_SECRET);
  req.user = payload;

  User.findById(payload._id)
    .then((currentUser) => {

      if (!currentUser) {
        const error = new Error("User not found")
        error.status = 404
        next(error)
      }
      res.status(200).send({ user: currentUser });
      r
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: `User ID is missing` });
      }
      next(err)

    });
};

module.exports.addUsers = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  const hashedPassowrd = hash.createHash(password)

  User.create({ name, about, avatar, email, password:hashedPassowrd })
    .then((user) => {
      if (!user){
        const error = new Error("Validation error")
        error.status = 400
        next(error)

      }
      const userObject = user.toObject()
      delete userObject.password
      res.status(201).send({ data: userObject });
    })
    .catch((next));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.params._id,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
    .then((user) =>{
      if (data === null || user instanceof mongoose.Error.ValidationError ||
        mongoose.Error.DocumentNotFoundError) {
        const error = new Error("User id not found")
        error.status = 404
        next(error)
      }
       res.send({ data: user }

       )})
    .catch((next));
};

module.exports.login = (req, res, next) => {
  const {email, password} = req.body;
  User.findUserByCredentials({email, password})
  .then((user) => {
    if (!user){
      const error = new Error("User or password not found")
        error.status = 404
        next(error)
    }
    const token = jwt.sign({_id: user._id}, NODE_ENV === 'production'? JWT_SECRET:DEV_SECRET, { expiresIn: '7d' } )
    res.status(200).send({token})
  })
  .catch((next))
}