const db = require("../database/models");
const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");
const fs = require("fs");

module.exports = {
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: (req, res) => {
    const errors = validationResult(req);
    const { email, remember } = req.body;

    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email,
        },
      })
        .then(({ id, name, roleId, avatar }) => {
          req.session.userLogin = {
            id,
            name,
            role: +roleId,
            avatar,
          };
          remember &&
            res.cookie("userEmail", req.session.userLogin, {
              maxAge: 1000 * 60 * 2,
            });

          return roleId == 1 ? res.redirect("/") : res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("users/login", {
        errors: errors.mapped(),
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("userEmail", null, {
      maxAge: -1,
    });

    return res.redirect("/");
  },

  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: (req, res) => {
    const errors = validationResult(req);
    const { name, surname, email, password } = req.body;

    if (errors.isEmpty()) {
      db.User.create({
        name,
        surname,
        email,
        password: hashSync(password.trim(), 10),
        roleId: 2,
        troleyId: null,
        avatar: req.file ? req.file.filename : null,
      })
        .then((newUser) => {
          console.log(newUser);
          return res.redirect("login");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("users/register", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        return res.render("users/profile", {
          ...user.dataValues,
        });
      })
      .catch((error) => console.log(error));
  },
  profileEdit: (req, res) => {
    db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        return res.render("users/profile-edit", {
          ...user.dataValues,
        });
      })
      .catch((error) => console.log(error));
  },
  profileUpload: (req, res) => {
    const errors = validationResult(req);
    const { name, surname } = req.body;

    if (errors.isEmpty()) {
      db.User.update(
        {
          name: name.trim(),
          surname,
          avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
        },
        {
          where: {
            id: req.session.userLogin.id,
          },
        }
      )
        .then((response) => {
          console.log(response);

          req.session.userLogin = {
            ...req.session.userLogin,
            name,
            avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
          };

          return res.redirect("/users/profile");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("users/profile-edit", {
        id: req.params.id,
        name: req.body.name,
        surname: req.body.surname,
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
};