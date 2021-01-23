const jwt = require('jsonwebtoken')

function getTokenAdmin(obj) {
  return jwt.sign({ id: obj.id, email: obj.email }, 'rahasia')
}

function getTokenCustomer(obj) {
  return jwt.sign({ id: obj.id, email: obj.email, name: obj.first_name }, 'rahasia')
}

function getTokenOrganizer(obj) {
  return jwt.sign({ id: obj.id, email: obj.email, name: obj.name }, 'rahasia')
}

function verify(token) {
  return jwt.verify(token, 'rahasia')
}

module.exports = { getTokenAdmin, getTokenCustomer, getTokenOrganizer, verify }