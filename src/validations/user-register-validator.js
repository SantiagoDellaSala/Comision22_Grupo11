const {check, body} = require ("express-validator")

const db = require('../database/models')


module.exports = [
    check('name')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({
        min : 2
    }).withMessage('Minimo 2 caracteres').bail()
    .isAlpha('es-ES',{ignore: " "}).withMessage('Solo caracteres alfabeticos'),

    check('surname')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({
        min : 2
    }).withMessage('Minimo 2 caracteres').bail(),

    body('email')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isEmail().withMessage('El email tiene un formato invalido').bail()
    .custom((value,{req})=>{

        return db.User.findOne({
            where:{
                email: value
            }
        }).then(user =>{
            if(user){
                return Promise.reject()
            }
        }

        ).catch(error=> {
            console.log(error)
            return Promise.reject('El email ya se encuentra registrado')
        }
        )
       
    }),
    check('password')
    .notEmpty().withMessage('Este campo es obligatorio')
    .isLength({
        min: 6,
        max:12
        }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2')
    .notEmpty().withMessage('Debes repetir contraseña')
    .custom((value,{req})=>{
        if(value != req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden')
]