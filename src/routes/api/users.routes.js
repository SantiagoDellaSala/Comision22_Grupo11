const express = require('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();
const { login, register, processRegister,processLogin,logout,profile,profileEdit, profileUpload } = require('../../controllers/usersController');
const userRegisterValidator = require('../../validations/user-register-validator')
const userLoginValidator = require('../../validations/user-login-validator');
const checkAuthUser = require('../../middlewares/checkAuthUser');
const checkUserLogin = require('../../middlewares/checkUserLogin');
const userEditValidator = require('../../validations/user-edit-validator');
const { listUsers, detailUsers } = require('../../api/usersController');

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
  .get('/api/users', listUsers)
  .get('/api/users/:id', detailUsers)

  .get('/login',checkAuthUser,login)
  .post('/login', userLoginValidator, processLogin )
  .get('/register', register)
  .post('/register', upload.single('avatar'),userRegisterValidator, processRegister)
  .get('/profile', checkUserLogin ,profile)
  .get('/editProfile', profileEdit)
  .put('/editProfile',upload.single('avatar'),userEditValidator, profileUpload)
  .get('/salir',logout)
  
module.exports = router;