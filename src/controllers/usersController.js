const { validationResult } = require("express-validator")
const User = require('../data/User')
const { leerJSON, escribirJSON } = require("../data")

module.exports = {
    login : (req, res) => {
        return res.render('users/login')
    },
    processLogin : (req,res) => {
        const errors = validationResult(req);
        const {email, remember} = req.body;

        if(errors.isEmpty()){

        const {id, name, role} = leerJSON('users').find(user => user.email === email)

            req.session.userLogin = {
                id,
                name,
                role
            }

            remember && res.cookie('SUYDS_user',req.session.userLogin,{
                maxAge : 1000 * 60 * 2
            })

            return res.redirect('/')

        }else {
            return res.render('users/login',{
                errors : errors.mapped()
            })
        }
    },
    logout : (req,res) => {
        
        req.session.destroy();
        res.cookie('SUYDS_user',null,{
            maxAge : -1
        })

        return res.redirect('/')
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

    },
    profile : (req,res) => {
        return res.render('users/profile')
    }
}