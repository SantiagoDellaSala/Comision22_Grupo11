module.exports = (sequelize, dataTypes) => {
    const Item = sequelize.define('Items', {
        id : {
            primaryKey : true,
            allowNull : false,
            autoIncrement : true,
            type: dataTypes.INTEGER,
        },
        cantidad : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        productItemId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
    },
    {
        tableName : 'items',
        timestamps : false,
    }
)
    return Item
}