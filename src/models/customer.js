'use strict';
const bcrypt = require("bcryptjs")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    fullName() {
      return `${this.first_name} ${this.last_name}`
    }

    static associate(models) {
      // define association here
      Customer.hasMany(models.Ticket)
      Customer.hasMany(models.Wishlist)
    }
  };
  Customer.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "First name cannot empty"
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.addHook('beforeCreate', (instance, option) => {
    if(instance.last_name === "") {
      instance.last_name = instance.first_name
    }
  })

  Customer.addHook("beforeCreate", (instance, option) => {
    let salt = bcrypt.genSaltSync(9)
    let hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })

  return Customer;

};