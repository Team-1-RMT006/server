const { Admin, Event, Banner, EventType, Status, Ticket } = require('../models/index')
const { getTokenAdmin } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

class AdminController {
  static async registerAdmin(req, res, next) {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const data = await Admin.create(obj)
      res.status(201).json(data)
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
        throw {
          status: 400,
          message: 'Email and password are required'
        }
      } else if (!obj.email) {
        throw {
          status: 400,
          message: 'Email is required'
        }
      } else if (!obj.password) {
        throw {
          status: 400,
          message: 'Password is required'
        }
      } else {
        const dataUser = await Admin.findOne({ where: { email: obj.email }})
        if (dataUser) {
          const dataCompared = compare(obj.password, dataUser.password)
          if (dataCompared) {
            dataUser.role = 'admin'
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
      event_preview: req.body.event_preview,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      capacity_regular: req.body.capacity_regular,
      capacity_vip: req.body.capacity_vip,
      capacity_vvip: req.body.capacity_vvip,
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

  static async editEvent (req, res, next) {
    const obj = {
      id: req.params.id,
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      capacity_regular: req.body.capacity_regular,
      capacity_vip: req.body.capacity_vip,
      capacity_vvip: req.body.capacity_vvip,
      price_regular: req.body.price_regular,
      price_vip: req.body.price_vip,
      price_vvip: req.body.price_vvip,
      EventTypeId: req.body.EventTypeId,
      OrganizerId: req.body.OrganizerId,
      StatusId: req.body.StatusId
    }
    try {
      const data = await Event.update(obj, { where: { id: obj.id }, returning: true})
      res.status(200).json(data[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async getEvent (req, res, next) {
    try {
      const data = await Status.findAll({include: {
        model: Event,
        include: [Ticket, EventType]}})
      let isContainData = false;

      for (let i = 0; i < data.length; i++) {
        if (data[i].Events.length > 0) {
          isContainData = true;
        }
      }
      if(isContainData) {
        res.status(200).json(data)
      } else {
        throw {
          status: 404,
          message: 'Data not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteEvent (req, res, next) {
    const id = req.params.id
    try {
      const data = await Event.destroy({ where: { id }})
      if (data > 0) {
        res.status(200).json({ message: 'Data deleted successful' })
      } else {
        throw {
          status: 400,
          message: 'Data not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async createBanner (req, res, next) {
    const obj = {
      image_url: req.body.image_url,
      detail: req.body.detail
    }
    try {
      const data = await Banner.create(obj)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getBanner (req, res, next) {
    try {
      const data = await Banner.findAll()
      if (data.length > 0) {
        res.status(200).json(data)
      } else {
        throw {
          status: 404,
          message: 'Data not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async editBanner (req, res, next) {
    const obj = {
      id: req.params.id,
      image_url: req.body.image_url,
      detail: req.body.detail
    }
    try {
      const data = await Banner.update(obj, { where: { id: obj.id }, returning: true})
      res.status(200).json(data[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleteBanner (req, res, next) {
    const id = req.params.id
    try {
      const data = await Banner.destroy({ where: { id }})
      if (data > 0) {
        res.status(200).json({ message: 'Data deleted successful' })
      } else {
        throw {
          status: 400,
          message: 'Data not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static getEventById(req, res, next) {
    const id = req.params.id

    Event.findByPk(id, {
        include: [Ticket, Organizer, EventType, Status]
    })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
  }

  static async getBannerById (req, res, next) {
    const id = req.params.id
    try {
      const data = await Banner.findByPk(id)
      if (data) {
        res.status(200).json(data)
      } else {
        throw {
          status: 404,
          message: "Data not found"
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async createEventType (req, res, next) {
    const obj = {
      name: req.body.name
    }
    try {
      const data = await EventType.create(obj)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getEventType (req, res, next) {
    try {
      const data = await EventType.findAll()
      if (data.length > 0) {
        res.status(200).json(data)
      } else {
        throw {
          status: 404,
          message: "Data not found"
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async editEventType (req, res, next) {
    const obj = {
      id: req.params.id,
      name: req.body.name
    }
    try {
      const current = await EventType.findByPk(obj.id)
      if (current.name === obj.name) {
        throw {
          status: 400,
          message: 'There is no data change'
        }
      }
      const data = await EventType.update(obj, { where: { id: obj.id }, returning: true })
      res.status(200).json(data[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleteEventType (req, res, next) {
    const id = req.params.id
    try {
      const data = await EventType.destroy({ where: { id }})
      if (data > 0) {
        res.status(200).json({ message: 'Data deleted successful' })
      } else {
        throw {
          status: 400,
          message: 'Data not found'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async getEventTypeById (req, res, next) {
    const id = req.params.id
    try {
      const data = await EventType.findByPk(id)
      if (data) {
        res.status(200).json(data)
      } else {
        throw {
          status: 404,
          message: "Data not found"
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController