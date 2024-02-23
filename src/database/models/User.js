module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('Users',{
        id : {
            primaryKey : true,
            allowNull : false,
            autoIncrement : true,
            type : dataTypes.INTEGER,
        },
        name : {
            allowNull : false,
            type : dataTypes.STRING(45),
        },
        surname : {
            allowNull : false,
            type : dataTypes.STRING(45),
        },
        email : {
            allowNull : false,
            type : dataTypes.STRING(45),
        },
        password : {
            allowNull : false,
            type : dataTypes.STRING(45),
        },
        avatar : {
            allowNull : true,
            type : dataTypes.STRING(45),
        },
        troleyId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        roleId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
    },
    {
        tableName : 'users',
        timestamps : false,
    })
    return User
}