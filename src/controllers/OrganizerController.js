const { Organizer } = require('../models/index');
const { compare } = require("../organizerHelpers/bcrypt");
const { sign } = require("../organizerHelpers/jwt");

class OrganizerController {
  static async registerOrganizer(req, res, next) {
    const obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone
    };
    try {
      const data = await Organizer.create(obj);
      res.status(201).json({ id: data.id, email: data.email });
    } catch (error) {
      next(error);
    }
  }

  static async loginOrganizer(req, res, next) {
    const isEmailEmpty = (!req.body.email || req.body.email.trim() === '');
    const isPasswordEmpty = (!req.body.password || req.body.password.trim() === '');

    try {
      if (isEmailEmpty && isPasswordEmpty) {
        res.status(400).json({ message: 'Email and password are required' });
      } else if (isEmailEmpty) {
        res.status(400).json({ message: 'Email is required' });
      } else if (isPasswordEmpty) {
        res.status(400).json({ message: 'Password is required' });
      } else {
        const data = await Organizer.findOne({
          where: {
            email: req.body.email
          }
        });
        if(!data) {
          throw {
            status: 401,
            message: "Email or password is invalid."
          };
        } else if (compare(req.body.password, data.password)) {
            const access_token = sign(data.id, data.email, data.role);
            res.status(200).json({ access_token });
        } else {
            throw {
              status: 401,
              message: "Email or password is invalid."
            };
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static getProfile(req, res, next) {
    Organizer.findOne({
      where: {
        id: req.loggedInUser.id
      }
    })
    .then((data) => {
      res.status(200).json({ name: data.name, email: data.email, address: data.address, phone: data.phone });
    })
    .catch((error) => {
        console.log(error);
        next(error);
    });
  }
}

module.exports = OrganizerController;
