'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Event)
      Ticket.belongsTo(models.Customer)
    }
  };
  Ticket.init({
    class: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Class is required'
        },
        notEmpty: {
          args: true,
          msg: 'Class is required'
        },
        isIn: {
          args: [['regular', 'vip', 'vvip']],
          msg: 'Class is invalid'
        }
      }
    },
    ticketCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Ticket code is required'
        },
        notEmpty: {
          args: true,
          msg: 'Ticket code is required'
        }
      }
    },
    seat: {
      type: DataTypes.STRING,
      allowNull: true
    },  
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status is required'
        },
        notEmpty: {
          args: true,
          msg: 'Status is required'
        },
        isIn: {
          args: [['unpaid', 'paid', 'closed']],
          msg: 'Status is invalid'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: "Price must be numeric"
        },
        min: {
          args: [0],
          msg: 'Price cannot be less than 0'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Ticket'
  });
  return Ticket;
};
