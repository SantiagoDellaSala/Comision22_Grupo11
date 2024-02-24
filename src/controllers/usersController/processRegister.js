module.exports =
processRegister = (req, res) => {
    const errors = validationResult(req);
    const { name, surname, email, password } = req.body;
    const avatar = req.file;
    if (errors.isEmpty()) {

        db.users.create({
            name,
            surname,
            email,
            password: bcryptjs.hashSync(password.trim(),10),
            roleId: 2
          })
          .then(user=>{
            console.log(user)
            return res.redirect('users/login')
          })
          .catch(error=> console.log(error))
          ;
      

      escribirJSON(users, "users");

      return res.redirect("/users/login");
    } else {
      return res.render("users/register", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  }
