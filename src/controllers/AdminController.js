const { Admin } = require('../../models/index')

class AdminController {
  static async registerAdmin(req, res, next) {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      if (!req.body.email && !req.body.password) {
        res.status(400).json({ message: 'Email and password are required' })
      } else if (!req.body.email) {
        res.status(400).json({ message: 'Email is required' })
      } else if (!req.body.password) {
        res.status(400).json({ message: 'Password is required' })
      } else {
        const data = await Admin.create(obj)
        res.status(201).json(data)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController