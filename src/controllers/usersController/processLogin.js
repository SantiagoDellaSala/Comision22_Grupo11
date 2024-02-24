const { validationResult } = require("express-validator");

const db = require ('../../database/models')

module.exports =


processLogin = (req, res) => {
    const errors = validationResult(req);
    const { email, remember } = req.body;

    if (errors.isEmpty()) {

      db.User.findOne({

        where:{
                email: req.body.email
        }
      })  
      .then(({id,name,roleId}) =>{

        req.session.userLogin = {
            id,
            name,
            role: +roleId
          };

          remember &&
            res.cookie("userEmail", req.session.userLogin, {
              maxAge: 1000 * 60 * 2,
            
          })
    
          return res.redirect("/");
       

      })
      .catch(error =>
        console.log(error))

    } else {
        return res.render("users/login", {
          errors: errors.mapped(),
        });   

      const { id, name, role, avatar } = leerJSON("users").find(
        (user) => user.email === email
      );

      

      
    }
  }