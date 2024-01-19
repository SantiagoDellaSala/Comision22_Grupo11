const bcryptjs = require('bcryptjs')
const crypto = require('crypto');

function User(name,user,email,password,avatar){
    this.id =  crypto.randomUUID();
    this.name = name.trim();
    this.user = user.trim();
    this.email = email.trim();
    this.password = bcryptjs.hashSync(password.trim(), 10);
    this.avatar = avatar ? avatar.filename : null;
    this.role = "user"
}

module.exports = User;