'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventType.hasMany(models.Event)
    }
  };
  EventType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Event type must be unique"
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Event type is required'
        },
        notEmpty: {
          args: true,
          msg: 'Event type is required'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'EventType',
  });
  return EventType;
};