const multer = require('multer');
const path = require('path');

const upload = (folderName) => multer({
    storage : multer.diskStorage({
        destination : function(req, file, callback){
            callback(null, `../public/images/${folderName}`)
        },
        filename : (req,file, callback) => {
            callback(null, `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`)
        }
    })
});

module.exports = upload