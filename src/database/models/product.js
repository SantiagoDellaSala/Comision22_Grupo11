'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId"
      });
      Product.belongsTo(models.Material, {
        as: "material",
        foreignKey: "materialId"
      });
      Product.belongsTo(models.Origin, {
        as: "origin",
        foreignKey: "originId"
      });
      Product.belongsTo(models.Quality, {
        as: "quality",
        foreignKey: "qualityId"
      });
      Product.belongsTo(models.Image, {
        as: "image",
        foreignKey: "imageId"
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    discount: DataTypes.INTEGER,
    mainImage: DataTypes.STRING,
    materialId: DataTypes.INTEGER,
    originId: DataTypes.INTEGER,
    qualityId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};