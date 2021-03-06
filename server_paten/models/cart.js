'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Shop, { foreignKey: 'shop_id' })
      Cart.belongsTo(models.Product, { foreignKey: 'product_id'})
    }
  }
  Cart.init(
    {
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      user_name: DataTypes.STRING,
      user_address: DataTypes.STRING,
      user_phone: DataTypes.STRING,
      shop_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  )
  return Cart
}
