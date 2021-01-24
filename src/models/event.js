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
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: (new Date).toString(),
          msg: "Date must be greater than today"
        }
      }
    },
    time: DataTypes.TIME,
    location: DataTypes.STRING,
    capacity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Capacity must be numeric'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: ["active", "non-active", "cancelled"],
          msg: "Status is invalid"
        }
      }
    },
    price_regular: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: "Regular price must be numeric"
        }
      }
    },
    price_vip: {
    type: DataTypes.INTEGER,
    allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: "VIP price must be numeric"
        }
      }
    },
    price_vvip: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: "VVIP price must be numeric"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });

  Event.beforeCreate((instance, option) => {
    instance.status = 'active'
  })
  
  return Event;
};