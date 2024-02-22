module.exports = (req,res,next) => {
    if(req.cookies.SUYDS_user){
        req.session.userLogin = req.cookies.SUYDS_user
    }

    next()
}