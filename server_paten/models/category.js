'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Category.hasMany(models.Product, { foreignKey: 'category_id' })
      Category.belongsTo(models.Shop, { foreignKey: 'shop_id' })
    }
  };
  Category.init({
    shop_id: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "name is required"
        },
        notNull: {
          args: true,
          msg: "name is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};