module.exports = (sequelize, dataTypes) =>{
    const Category = sequelize.define('Categories',{
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
        tableName : 'categories',
        timestamps : true,
    }
)
    return Category
}