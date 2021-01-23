const { verify } = require('../helpers/jwt')
const { Admin } = require('../models/index')

module.exports = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      throw {
        status: 401,
        message: 'You are not authorized'
      }
    } else {
      const dataVerified = verify(access_token)
      const data = await Admin.findByPk(dataVerified.id)
      if (data) {
        req.loggedInUser = data
        next()
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