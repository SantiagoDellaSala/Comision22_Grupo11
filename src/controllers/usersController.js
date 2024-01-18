const { leerJSON, escribirJSON} = require("../data");
const users = leerJSON('users')

module.exports = {
    login : (req, res) => {
        return res.render('users/login')
    },
    register : (req, res) => {
        return res.render('users/register')
    },
    profile : (req, res) => {
        const user = users.find(user => user.id === +req.params.id)
        return res.render('users/profile', {
            ...user,
        })
    },

    editProfile : (req, res) => {
        let { firstName, lastName} = req.body;
        users.forEach(user => {
            if (user.id === +req.params.id) {
    
                user.firstName = firstName ? firstName.trim() : user.firstName;
                user.lastName = lastName ? lastName.trim() : user.lastName;
        
            }
                
        });

        escribirJSON(users, 'users');

        return res.redirect('/users/profile')
    },
    }