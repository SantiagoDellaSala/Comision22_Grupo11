module.exports = (sequelize, dataTypes) => {
    const Troley = sequelize.define('Troley', {
        id : {
            primaryKey : true,
            allowNull : false,
            autoIncrement : true,
            type : dataTypes.INTEGER,
        },
        total : {
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        stateId : {
            allowNull : false,
            type: dataTypes.INTEGER
        },
        itemId : {
            allowNull : false,
            type: dataTypes.INTEGER
        },
    },
    {
        tableName : 'troley',
        timestamps : false,
    })
    return Troley
}