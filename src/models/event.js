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
        notNull: {
          args: true,
          msg: 'Title is required'
        },
        notEmpty: {
          args: true,
          msg: 'Title is required'
        }
      }
    },
    event_preview: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Date is required'
        },
        notEmpty: {
          args: true,
          msg: 'Date is required'
        },
        isAfter: {
          args: (new Date).toString(),
          msg: "Date must be greater than today"
        }
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Time is required'
        },
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
        notNull: {
          args: true,
          msg: 'Location is required'
        },
        notEmpty: {
          args: true,
          msg: 'Location is required'
        }
      }
    },
    capacity_regular: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Regular capacity must be numeric'
        },
        min: {
          args: [1],
          msg: 'Regular capacity must be greater than 0'
        }
      }
    },
    capacity_vip: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'VIP capacity must be numeric'
        },
        min: {
          args: [1],
          msg: 'VIP capacity must be greater than 0'
        }
      }
    },
    capacity_vvip: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'VVIP capacity must be numeric'
        },
        min: {
          args: [1],
          msg: 'VVIP capacity must be greater than 0'
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
        },
        min: {
          args: [0],
          msg: 'Regular price cannot be less than 0'
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
        },
        min: {
          args: [0],
          msg: 'VIP price cannot be less than 0'
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
        },
        min: {
          args: [0],
          msg: 'VVIP price cannot be less than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event'
  });

  Event.beforeCreate((instance, option) => {
    instance.StatusId = 1
  })
  
  return Event;
};