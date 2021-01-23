'use strict';
const { hash } = require("../organizerHelpers/bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organizer.hasMany(models.Event)
    }
  };
  Organizer.init({
<<<<<<< HEAD
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
=======
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Email is invalid'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [7, 128],
          msg: 'Password must contain at least 7 characters and maximum 128 characters'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Address is required'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone is required'
        }
      }
    }
>>>>>>> main
  }, {
    sequelize,
    modelName: 'Organizer',
  });

  Organizer.beforeCreate((instance, options) => {
    let hashed = hash(instance.password);
    instance.password = hashed;
  });

  return Organizer;
};