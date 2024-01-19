const express = require('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();
const { login, register, processRegister,processLogin,logout,profile } = require('../controllers/usersController');
const userRegisterValidator = require('../validations/user-register-validator')
const userLoginValidator = require('../validations/user-login-validator');
const checkAuthUser = require('../middlewares/checkAuthUser');
const checkUserLogin = require('../middlewares/checkUserLogin');

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
  .get('/login',checkAuthUser,login)
  .post('/login', userLoginValidator, processLogin )
  .get('/register', register)
  .post('/register',upload.single('avatar'),userRegisterValidator, processRegister)
  .get('/perfil',checkUserLogin, profile)
  .get('/salir',logout)
  
module.exports = router;
