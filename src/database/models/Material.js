module.exports = (sequelize, dataTypes) => {
    const Material = sequelize.define('Materials', {
        id : {
            primaryKey : true,
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        name : {
            allowNull : false,
            type : dataTypes.STRING(45),
        },
        
    },
    {
        tableName : 'materials',
        timestamps : true,
    })
    return Material;
}