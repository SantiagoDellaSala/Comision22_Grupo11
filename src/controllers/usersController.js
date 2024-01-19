const { validationResult } = require("express-validator")
const User = require('../data/User')
const { leerJSON, escribirJSON } = require("../data")

module.exports = {
    login : (req, res) => {
        return res.render('users/login')
    },
    register : (req, res) => {
        return res.render('users/register')
    },
    processRegister: (req,res) => {
        const errors = validationResult(req)
        const {name,user,email,password} = req.body;
        const avatar = req.file
        if(errors.isEmpty()){

            const users = leerJSON('users')
            const nuevoUsuario = new User(name,user,email,password,avatar);

            users.push(nuevoUsuario);

            escribirJSON(users,'users')

            return res.redirect('/users/login')
            
        }else{
            return res.render('users/register',{
                old : req.body,
                errors : errors.mapped()
            })

        }

    }
}