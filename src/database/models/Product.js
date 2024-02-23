module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Products', {
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
        price : {
            allowNull : false,
            type : dataTypes.INTEGER,  
        },
        description : {
            allowNull : false,
            type : dataTypes.TEXT,  
        },
        discount : {
            allowNull : true,
            defaultValue : 0,
            type : dataTypes.INTEGER,
        },
        mainImage : {
            allowNull : false,
            type : dataTypes.STRING(255),
        },
        categoryId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        materialId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        originId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        imageId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        qualityId : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
    },
    {
        tableName : 'products',
        timestamps : false,
    })
    return Product
}