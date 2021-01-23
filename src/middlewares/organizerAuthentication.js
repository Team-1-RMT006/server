const { Organizer } = require("../models");
const { verifyToken } = require("../organizerHelpers/jwt");

module.exports = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw {
                status: 401,
                message: "Unauthorized Access!"
            }
        } else {
            const decoded = verifyToken(access_token);
            req.loggedInUser = decoded;
            const organizer = await Organizer.findOne({
                where: {
                    id: decoded.id
                }
            })

            if (organizer) {
                next();
            } else {
                throw {
                    status: 401,
                    message: "Unauthorized Access!"
                }
            }
        }
    } catch (err) {
        next(err);
    }
}