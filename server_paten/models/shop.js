'use strict'
const { Model } = require('sequelize')
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop.init(
    {
      email: {
        allowNull: false,
        unique: {
          args: true,
          msg: 'email is already in use',
        },
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'invalid email format',
          },
          notNull: {
            args: true,
            msg: 'email is required',
          },
          notEmpty: {
            args: true,
            msg: 'email is required',
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'password is required',
          },
          notEmpty: {
            args: true,
            msg: 'password is required',
          },
        },
      },
      name: {
        allowNull: false,
        unique: {
          args: true,
          msg: 'email is already in use',
        },
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
      icon_url: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: {
            args: true,
            msg: 'icon is required',
          },
          notEmpty: {
            args: true,
            msg: 'icon is required',
          },
        },
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'address is required',
          },
          notEmpty: {
            args: true,
            msg: 'address is required',
          },
        },
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: 'phone is required',
          },
          notEmpty: {
            args: true,
            msg: 'phone is required',
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
      },
    },
    {
      sequelize,
      modelName: 'Shop',
    }
  )

  Shop.beforeCreate((shop, options) => {
    shop.password = hashPassword(shop.password)
  })

  return Shop
}
