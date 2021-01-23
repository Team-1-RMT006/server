const jwt = require("jsonwebtoken");

function sign(id, email, role) {
    return jwt.sign({ id, email, role}, "nobodyknows");
}

function verifyToken(token) {
    return jwt.verify(token, "nobodyknows");
}

module.exports = {
    sign,
    verifyToken
}