module.exports = (sequelize, dataTypes) =>{
    const Origin = sequelize.define('Origins',{
        id : {
            primaryKey : true,
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        name : {
            allowNUll : false,
            type : dataTypes.STRING(45),
        },
    },
    {
        tableName : 'origins',
        timestamps : true,
    }
)
    return Origin;
}