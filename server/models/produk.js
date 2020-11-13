'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Produk.init({
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'price cannot be empty!'},
        notEmpty: { args: true, msg: 'price cannot be empty!'},
        isInt: { args: true, msg: 'price must be a positive integer'},
        min: { args: [0], msg: 'price must be a positive integer'}
      }
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'description cannot be empty!'},
        notEmpty: { args: true, msg: 'description cannot be empty!'}
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
        notNull: { args: true, msg: 'image url cannot be empty!'},
        notEmpty: { args: true, msg: 'image url cannot be empty!'}
      }
    },
    berat: { // ini mending ganti ke stock aja
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'weight cannot be empty!'},
        notEmpty: { args: true, msg: 'weight cannot be empty!'},
        isInt: { args: true, msg: 'please input number format!'},
        min: { args: [0], msg: 'please input number above 0!'}
      }
    }
  }, {
    sequelize,
    modelName: 'Produk',
  });
  return Produk;
};