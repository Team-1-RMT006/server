'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.hasMany(models.Event)
    }
  };
  Status.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Status name is required'
        }
      }}
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};