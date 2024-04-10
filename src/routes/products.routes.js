const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const productAddValidator = require('../validations/product-add-validator')
const { detail, add, edit, update, create, allProducts, remove, filterCat} = require('../controllers/productsController');

const productAddValidator = require('../validations/product-add-validator')
const productEditValidator = require('../validations/product-edit-validator')

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,(path.join(__dirname,"../","../","/public/images/productos")))
  },
  filename:(req,file,cb)=>{

      cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
  }
});
const upload = multer({storage})


/* productos */
router
  .get('/allProducts', allProducts)
  .get('/detail/:id', detail)
  .get('/agregar',productAddValidator,add)
  .get('/editar/:id', edit)
<<<<<<< HEAD
  .put('/editar/:id',upload.single('mainImage'),productEditValidator, update)
  .post('/create',upload.single('mainImage'),productAddValidator,create)
=======
  .put('/editar/:id',upload.single('mainImage') , update)
  .post('/create',productAddValidator,upload.single('mainImage'),create)
>>>>>>> 3b5c55f7c27b80c465e86e386ebc0c622e96aa1f
  .delete('/delete/:id', remove)
  .get('/category/:id', filterCat) 


module.exports = router