'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shop.hasMany(models.Category, ({ foreignKey: 'shop_id'}))
      Shop.hasMany(models.Product, ({ foreignKey: 'shop_id'}))
      // Shop.hasMany(models.Product)
      // Shop.hasMany(models.Category)
    }
  };
  Shop.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    icon_url: DataTypes.TEXT,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};