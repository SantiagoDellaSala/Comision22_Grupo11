const db =require('../database/models')
const { validationResult } = require("express-validator")
const {hashSync} = require('bcryptjs')


module.exports = {
    login : (req, res) => {
        return res.render('users/login')
    },
    processLogin: (req, res) => {
        const errors = validationResult(req);
        const { email, remember } = req.body;

        if(errors.isEmpty()){
    
            db.User.findOne({
                where : {
                    email
                }
            })
                .then(({id, name, roleId, avatar}) => {
    
                    req.session.userLogin = {
                        id,
                        name,
                        role : +roleId,
                        avatar
                    }
                    remember && res.cookie('userEmail',req.session.userLogin,{
                        maxAge : 1000 * 60 * 2
                    })
            
                    return roleId == 1 ? res.redirect('/') : res.redirect('/')
    
                })
                .catch(error => console.log(error))
    
        }else {
            return res.render('users/login',{
                errors : errors.mapped()
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
        const {name,surname:lastName,email,password} = req.body;
        const avatar = req.file
        if(errors.isEmpty()){
            db.User.create({
                name,
                lastName,
                email,
                password : hashSync(password.trim(),10),
                roleId : 2,
                avatar
            })
            
            
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