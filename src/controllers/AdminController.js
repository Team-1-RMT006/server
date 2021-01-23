const { Admin, Event } = require('../models/index')
const { getTokenAdmin } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

class AdminController {
  static async registerAdmin(req, res, next) {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      if (!obj.email && !obj.password) {
        res.status(400).json({ message: 'Email and password are required' })
      } else if (!obj.email) {
        res.status(400).json({ message: 'Email is required' })
      } else if (!obj.password) {
        res.status(400).json({ message: 'Password is required' })
      } else {
        const data = await Admin.create(obj)
        res.status(201).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async loginAdmin (req, res, next) {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      if (!obj.email && !obj.password) {
        res.status(400).json({ message: 'Email and password are required' })
      } else if (!obj.email) {
        res.status(400).json({ message: 'Email is required' })
      } else if (!obj.password) {
        res.status(400).json({ message: 'Password is required' })
      } else {
        const dataUser = await Admin.findOne({ where: { email: obj.email }})
        if (dataUser) {
          const dataCompared = compare(obj.password, dataUser.password)
          if (dataCompared) {
            const access_token = getTokenAdmin(dataUser)
            res.status(200).json({ access_token })
          } else {
            throw {
              status: 401,
              message: 'Email or password incorrect'
            }
          }
        } else {
          throw {
            status: 401,
            message: 'Invalid account'
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async createEvent (req, res, next) {
    const obj = {
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      capacity: req.body.capacity,
      price_regular: req.body.price_regular,
      price_vip: req.body.price_vip,
      price_vvip: req.body.price_vvip,
      EventTypeId: req.body.EventTypeId,
      OrganizerId: req.body.OrganizerId
    }
    try {
      const data = await Event.create(obj)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController