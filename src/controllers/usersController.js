const { validationResult } = require("express-validator")
const User = require('../data/User')
const { leerJSON, escribirJSON } = require("../data")
const users = leerJSON('users');

module.exports = {
    login : (req, res) => {
        return res.render('users/login')
    },
    register : (req, res) => {
        return res.render('users/register')
    },
    processRegister: (req,res) => {
        const errors = validationResult(req)
        const {name,lastName,email,password} = req.body;
        const avatar = req.file
        if(errors.isEmpty()){

            const users = leerJSON('users')
            const nuevoUsuario = new User(name,lastName,email,password,avatar);

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
    /* SANTIAGO */
    profile : (req, res) => {
        const user = users.find(user => user.id === +req.params.id)
        return res.render('users/profile', {
            user
        })
    },
    profileEdit : (req, res) => {
        const user = users.find((user)=>user.id === +req.params.id);
        
        return res.render('users/profile-edit',{
			...user
        })
    },
    profileUpload : (req, res) => {

        const {name, lastName} = req.body;

        const {id} = req.params;

        users.forEach(usuario => {
            if(usuario.id === +req.params.id){
                usuario.name = name ? name.trim() : usuario.name;
                usuario.lastName = lastName ? lastName.trim() : usuario.lastName;
            }
        })
        escribirJSON(users, 'users')

        return res.redirect('/users/profile/' + req.params.id)
    }
}