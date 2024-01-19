const {check} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es requerido.').bail()
        .isLength({
            min: 3,
            max: 15
        }).withMessage('El nombre debe tener mínimo 3 letras y máximo 15'),

    check('user')
        .notEmpty().withMessage('El apellido es requerido').bail()
        .isLength({
            min: 3,
            max: 15
        }).withMessage('El apellido debe tener mínimo 3 letras y máximo 15'),
]