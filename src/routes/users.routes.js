const express = require('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();
const { login, register, processRegister, profile, profileEdit, profileUpload } = require('../controllers/usersController');
const userRegisterValidator = require('../validations/user-register-validator')
const userEditValidator = require('../validations/user-edit-validator')


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,(path.join(__dirname,"../","../","/public/images/avatars")))
  },
  filename:(req,file,cb)=>{

      cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
  }
});
const upload = multer({storage})


/* /users */
router
  .get('/login', login)
  .get('/register', register)
  .post('/register',upload.single('avatar'),userRegisterValidator, processRegister)
  .get('/profile/:id', profile)
  .get('/editProfile/:id', profileEdit)
  .put('/editProfile/:id',userEditValidator, profileUpload)

module.exports = router;