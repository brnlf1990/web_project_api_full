const mongoose = require("mongoose");
const {validateHash} = require('../utils/hash')
const Joi = require("joi");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: function (link) {
        return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w._~:/?%#\[\]@!$&'()*+,;=]*[\w._~:/?%#\[\]@!$&'()*+,;=])?$/gi.test(
          link
        );
      },
    },
    message: (props) => `${props.value}`,
    required: true,
  },
  email:{
    type:String,
    lowercase:true,
    trim:true,
    required:'Email is required',
    unique: true,

  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({email, password}) {
  return this.findOne({email})
  .then((user) => {
    if (!user){
      return Promise.reject(new Error('Email or Password Does Not Match'))
    }

    return validateHash(password, user.password)
    .then((matched) => {
      if(!matched){
        return Promise.reject(new Error('Email or Password Does Not Match'));
      }
      return user
    })
  })
}

module.exports = mongoose.model("user", userSchema)