'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Troley extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /* Troley.belongsTo(models.State, {
        as: "states",
        foreignKey: "stateId"
      });
      Troley.belongsTo(models.Item, {
        as: "items",
        foreignKey: "itemsId"
      }); */
    }
  }
  Troley.init({
    total: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'troley',
  });
  return Troley;
};