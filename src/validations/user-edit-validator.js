const {check, body} = require('express-validator');



module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es requerido.').bail()
        .isLength({
            min: 3,
            max: 15
        }).withMessage('El nombre debe tener mínimo 3 letras y máximo 15').bail()
        .isAlpha('es-ES', {ignore: ' '}).withMessage('Solo caracteres alfabéticos'),

    check('lastName')
        .notEmpty().withMessage('El apellido es requerido').bail()
        .isLength({
            min: 3,
            max: 15
        }).withMessage('El apellido debe tener mínimo 3 letras y máximo 15').bail()
        .isAlpha('es-ES',{ignore: ' '}).withMessage('Solo caracteres alfabéticos'),
    
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('El email tiene un formato invalido').bail(),    
]