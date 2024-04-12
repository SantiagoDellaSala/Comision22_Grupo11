const {check,body} = require ('express-validator')

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail(),
check('price')
    .notEmpty().withMessage('El precio es obligatorio'),
check('categoryId')
.notEmpty().withMessage('La categoría es obligatoria'),
check('materialId')
.notEmpty().withMessage('El material es obligatoria'),
check('originId')
.notEmpty().withMessage('El origen es obligatoria'),
check('qualityId')
.notEmpty().withMessage('La Calidad es obligatoria'),
check('description')
        .notEmpty().withMessage('La descripción es requerida').bail()
        .isLength({
            min: 20,
            max: 500
        }).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
body('mainImage')
        .custom((value, {req}) => {
            if(!req.file){
                return false
            }
            return true
        }).withMessage('Se require una imagen'),
]