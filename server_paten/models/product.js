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
      // define association here
      Product.belongsTo(models.Category, ({ foreignKey: 'category_id'}))
      Product.belongsTo(models.Shop, ({ foreignKey: 'shop_id'}))
      Product.hasMany(models.Cart, ({ foreignKey: 'product_id' }))
    }
  };
  Product.init({
    shop_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'shop_id is required',
        },
        notEmpty: {
          args: true,
          msg: 'shop_id is required',
        },
      },
    },
    category_id: DataTypes.INTEGER,
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'name is required',
        },
        notEmpty: {
          args: true,
          msg: 'name is required',
        },
      },
    },
    image_url: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          args: true,
          msg: 'image_url is required',
        },
        notEmpty: {
          args: true,
          msg: 'image_url is required',
        },
      },
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'price is required',
        },
        notEmpty: {
          args: true,
          msg: 'price is required',
        },
      },
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'stock is required',
        },
        notEmpty: {
          args: true,
          msg: 'stock is required',
        },
      },
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          args: true,
          msg: 'description is required',
        },
        notEmpty: {
          args: true,
          msg: 'description is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};