'use strict';
const {hashPassword} = require('../helper/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: 'invalid email or password!'},
        notNull: { args: true, msg: 'password or email cannot be empty!'},
        notEmpty: { args: true, msg: 'password or email cannot be empty!'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'password or email cannot be empty!'},
        notEmpty: { args: true, msg: 'password or email cannot be empty!'}
      }
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'name cannot be empty!'},
        notEmpty: { args: true, msg: 'name cannot be empty!'}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'image_url cannot be empty!'},
        notEmpty: { args: true, msg: 'image_url cannot be empty!'}
      }
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'address cannot be empty!'},
        notEmpty: { args: true, msg: 'address cannot be empty!'}
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
    hooks : {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return Customer;
};