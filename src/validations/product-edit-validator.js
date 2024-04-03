const {check} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre del Producto es obligatorio'),
    check('price')
        .notEmpty().withMessage('El Precio es requerida'),
    check('discount')
        .notEmpty().withMessage('El Descuento es requerido'),    
    check('categoryId')
        .notEmpty().withMessage('La categoría es requerida'),
        check('materialId')
        .notEmpty().withMessage('El material es requerido'),  
        check('originId')
        .notEmpty().withMessage('El origen es requerido'),   
        check('qualityId')
        .notEmpty().withMessage('La calidad es requerida'),   
    check('description')
        .notEmpty().withMessage('La descripción es requerida').bail()
        .isLength({
            min: 20,
            max: 500
        }).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
]