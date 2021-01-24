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
      Event.belongsTo(models.Status)
    }
  };
  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is required'
        },
        notNull: {
          args: true,
          msg: 'Title is required'
        }
      }},
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: (new Date).toString(),
          msg: "Date must be greater than today"
        }
      }
    },
    time: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Time is required'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location is required'
        },
        notNull: {
          args: true,
          msg: 'Location is required'
        }
      }},
    capacity_regular: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Capacity must be numeric'
        }
      }
    },
    capacity_vip: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Capacity must be numeric'
        }
      }
    },
    capacity_vvip: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Capacity must be numeric'
        }
      }
    },
    price_regular: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Regular price must be numeric"
        }
      }
    },
    price_vip: {
    type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "VIP price must be numeric"
        }
      }
    },
    price_vvip: {
      type: DataTypes.INTEGER,
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