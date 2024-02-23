module.exports = (sequelize, dataTypes) => {
    const Role = sequelize.define('Roles', {
        id : {
            primaryKey : true,
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        name : {
            allowNull : false,
            type : dataTypes.STRING(45),
        }
    },
    {
        tableName : 'roles',
        timestamps : true,
    })
    return Role
}