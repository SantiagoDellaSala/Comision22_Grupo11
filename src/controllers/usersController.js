const { leerJSON} = require("../data");
const users = leerJSON('users')

module.exports = {
    login : (req, res) => {
        return res.render('users/login')
    },
    register : (req, res) => {
        return res.render('users/register')
    },
    profile : (req, res) => {
        return res.render('users/profile', {
            users
        })
    }
}