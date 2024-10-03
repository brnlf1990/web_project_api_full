
const usersRouter = require("express").Router();
const {
  getUsers,
  getUsersById,
  updateUser,
  getCurrentUser
} = require("../controlers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/me", getCurrentUser);
usersRouter.get("/:_id", getUsersById);



usersRouter.patch("/:_id", updateUser);
usersRouter.patch("/:_id/avatar", updateUser);
module.exports = usersRouter;
