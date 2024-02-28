

module.exports=

profileUpload=  (req, res) => {
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
  }
