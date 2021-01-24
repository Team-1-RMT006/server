const jwt = require("jsonwebtoken")

function generateToken(payload) {
    return jwt.sign(payload, "raninuraeinimunawaroh")
}

function verifyToken(encoded) {
    return jwt.verify(encoded, "raninuraeinimunawaroh")
}

module.exports = {
    generateToken,
    verifyToken
}