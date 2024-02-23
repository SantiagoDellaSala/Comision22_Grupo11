module.exports = (sequelize, dataTypes) => {
    const Image = sequelize.define('Images',{
        id : {
            primaryKey : true,
            allowNull : false,
            autoIncrement : true,
            type : dataTypes.INTEGER,
        },
        name : {
            type : dataTypes.STRING(255),
        },
    },
    {
        tableName : 'images',
        timestamps : true,
    }
)
    return Image
}