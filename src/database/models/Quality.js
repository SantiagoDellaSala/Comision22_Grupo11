module.export = (sequelize, dataTypes) => {
    const Quality = sequelize.define('Qualities',{
        id : {
            primaryKey : true,
            allowNull : false,
            type : dataTypes.INTEGER,
        },
        name : {
            allowNull : false,
            type : dataTypes.STRING(45),
        }
    },{
        tableName : 'qualities',
        timestamps : true,
    })
    return Quality
}