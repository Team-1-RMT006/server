const bcrypt = require('bcryptjs')

function hash(password) {
  return bcrypt.hashSync(password, 10)
}

function compare(password, hashed) {
  return bcrypt.compareSync(password, hashed)
}

module.exports = { hash, compare }