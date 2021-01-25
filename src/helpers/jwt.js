const jwt = require('jsonwebtoken')

function getTokenAdmin(obj) {
  return jwt.sign({ id: obj.id, email: obj.email, role: obj.role }, 'rahasia')
}

// function getTokenCustomer(obj) {
//   return jwt.sign({ id: obj.id, email: obj.email, name: obj.first_name, role: obj.role }, 'rahasia')
// }

// function getTokenOrganizer(obj) {
//   return jwt.sign({ id: obj.id, email: obj.email, name: obj.name, role: obj.role }, 'rahasia')
// }

function verify(token) {
  return jwt.verify(token, 'rahasia')
}

module.exports = { getTokenAdmin, verify }