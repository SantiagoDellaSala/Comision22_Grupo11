const { validationResult } = require("express-validator");
const User = require("../../data/User");
const { leerJSON, escribirJSON } = require("../../data");
const users = leerJSON("users");

const register = require('./register')
const processRegister = require('./processRegister')
const login = require('./login')
const processLogin = require('./processLogin')
const logout = require('./logout')


const db = require("../../database/models");
const { hashSync } = require("bcryptjs");

module.exports = {
  register,  
  processRegister,
  login,
  processLogin,
  logout,

  /* SANTIAGO */
  profile: (req, res) => {
    const users = leerJSON("users");
    const user = users.find((user) => user.id === req.params.id);
    return res.render("users/profile", {
      user,
    });
  },
  profileEdit: (req, res) => {
    const user = users.find((user) => user.id === req.params.id);

    return res.render("users/profile-edit", {
      ...user,
    });
  },
  profileUpload: (req, res) => {
    const errors = validationResult(req);
    const { name, lastName, email } = req.body;
    const { id } = req.params;

    if (errors.isEmpty()) {
      users.forEach((usuario) => {
        if (usuario.id === req.params.id) {
          usuario.name = name ? name.trim() : usuario.name;
          usuario.lastName = lastName ? lastName.trim() : usuario.lastName;
          usuario.email = email ? email.trim() : usuario.email;
        }
      });
      escribirJSON(users, "users");

      return res.redirect("/users/profile/" + req.params.id);
    } else {
      const user = users.find((user) => user.id === req.params.id);
      return res.render("users/profile-edit", {
        errors: errors.mapped(),
        ...user,
      });
    }
  },
};
