const bcryptjs = require('bcryptjs')
const crypto = require('crypto');

function User(name,lastName,email,password,avatar){
    this.id =  crypto.randomUUID();
    this.name = name.trim();
    this.lastName= lastName.trim();
    this.email = email.trim();
    this.password = bcryptjs.hashSync(password.trim(), 10);
    this.avatar = avatar ? avatar.filename : 'default.png';
    this.role = "user"
}

module.exports = User;