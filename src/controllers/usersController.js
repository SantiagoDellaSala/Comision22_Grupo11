const db =require('../database/models/Index')
const { validationResult } = require("express-validator")
const User = require('../data/User')
const { leerJSON, escribirJSON } = require("../data")
const users = leerJSON('users');



module.exports = {
    login : (req, res) => {
        return res.render('users/login')
    },
    processLogin: (req, res) => {
        const errors = validationResult(req);
        const { email, remember } = req.body;

        if (errors.isEmpty()) {

            const { id, name, role, avatar} = leerJSON('users').find(user => user.email === email)
           

            req.session.userLogin = {
                id,
                name,
                role,
                avatar
            }
            
            if (remember) {
                res.cookie('userEmail',req.session.userLogin,{
                    maxAge : 1000 * 60 * 2
                })  
            }

            return res.redirect('/')

        } else {
            return res.render('users/login', {
                errors: errors.mapped()
            })
        }
    },
    logout : (req,res) => {
        
        req.session.destroy();
        res.cookie('userEmail',null,{
            maxAge : -1
        }) 

        return res.redirect('/')
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

    
    profile : (req, res) => {
        const users = leerJSON('users');
        const user = users.find(user => user.id === req.params.id)
        return res.render('users/profile', {
            user
        })
    },
    profileEdit : (req, res) => {
        const user = users.find((user)=>user.id === req.params.id);
        
        return res.render('users/profile-edit',{
			...user
        })
    },
    profileUpload : (req, res) => {
        const errors = validationResult(req);
        const {name, lastName, email} = req.body;
        const {id} = req.params;
        
        if (errors.isEmpty()) {
            users.forEach(usuario => {
                if(usuario.id === req.params.id){
                    usuario.name = name ? name.trim() : usuario.name;
                    usuario.lastName = lastName ? lastName.trim() : usuario.lastName;
                    usuario.email = email ? email.trim() : usuario.email;

                }
            })
            escribirJSON(users, 'users')

            return res.redirect('/users/profile/' + req.params.id)
        } else {
            const user = users.find((user)=>user.id === req.params.id);
            return res.render('users/profile-edit',{
                errors: errors.mapped(),
                ...user
            })
        }
            

    }
}