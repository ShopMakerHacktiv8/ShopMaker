'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toko extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Toko.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'name cannot be empty!'},
        notEmpty: { args: true, msg: 'name cannot be empty!'}
      }
    },
    logo_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'logo path cannot be empty!'},
        notEmpty: { args: true, msg: 'logo path cannot be empty!'}
      }
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'address cannot be empty!'},
        notEmpty: { args: true, msg: 'address cannot be empty!'}
      }
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'description cannot be empty!'},
        notEmpty: { args: true, msg: 'description cannot be empty!'}
      }
    }
  }, {
    sequelize,
    modelName: 'Toko',
  });
  return Toko;
};