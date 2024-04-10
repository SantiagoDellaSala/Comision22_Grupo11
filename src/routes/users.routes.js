const express = require('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();
const { login, register, processRegister,processLogin,logout,profile,profileEdit, profileUpload } = require('../controllers/usersController');
const userRegisterValidator = require('../validations/user-register-validator')
const userLoginValidator = require('../validations/user-login-validator');
const checkAuthUser = require('../middlewares/checkAuthUser');
const checkUserLogin = require('../middlewares/checkUserLogin');
const userEditValidator = require('../validations/user-edit-validator')

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,(path.join(__dirname,"../","../","/public/images/avatars")))
  },
  filename:(req,file,cb)=>{

      cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`);
  }
})
const fileFilter = function(req, file,callback) {
  if(!file.originalname.match(/.(jpg|jpeg|png|gif)$/)){
      req.fileValidationError = "Sólo imágenes (.jpg, .jpeg, .png, .gif)";
      return callback(null,false,req.fileValidationError);
  }
  callback(null,true);
};
const upload = multer({storage, fileFilter})

/* /users */
router
  .get('/login',checkAuthUser,login)
  .post('/login', userLoginValidator, processLogin )
  .get('/register', register)
  .post('/register', upload.single('avatar'),userRegisterValidator, processRegister)
  .get('/profile', checkUserLogin ,profile)
  .get('/editProfile', profileEdit)
  .put('/editProfile',upload.single('avatar'),userEditValidator, profileUpload)
  .get('/salir',logout)
  
module.exports = router;