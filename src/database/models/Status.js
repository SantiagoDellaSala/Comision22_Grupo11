module.exports = (sequelize, dataTypes) => {
    const Status = sequelize.define('Statutes', {
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
        tableName : 'statutes',
        timestamps : true,
    })
    return Status
}