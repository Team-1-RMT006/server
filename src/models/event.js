'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Organizer)
      Event.hasMany(models.Wishlist)
      Event.hasMany(models.Ticket)
      Event.belongsTo(models.EventType)
    }
  };
  Event.init({
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    price_regular: DataTypes.INTEGER,
    price_vip: DataTypes.INTEGER,
    price_vvip: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });

  Event.beforeCreate((instance, option) => {
    instance.status = 'active'
  })
  
  return Event;
};