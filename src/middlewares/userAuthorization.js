const { Wishlist, Ticket } = require("../models")

function authorizationPayment(req, res, next) {

    const id = req.params.id
    const CustomerId = req.dataUser.id
    Ticket.findByPk(id)
        .then(data => {
            if (CustomerId === data.CustomerId) {
                next()
            } else {
                res.status(401).json({ message: "You dont have permission" })
            }
        })
        .catch(err => {
            next(err)
        })

}

function authorizationWishlist(req, res, next) {
    const id = req.params.id
    const CustomerId = req.dataUser.id

    Wishlist.findByPk(id)
        .then(data => {
            if (CustomerId === data.CustomerId) {
                next()
            } else {
                res.status(401).json({ message: "You dont have permission" })
            }
        })
        .catch(err => {
            next(err)
        })

}

function authorizationTicket(req, res, next) {
    const id = req.params.id
    const CustomerId = req.dataUser.id

    Ticket.findByPk(id)
        .then(data => {
            if (CustomerId === data.CustomerId) {
                next()
            } else {
                res.status(401).json({ message: "You dont have permission" })
            }
        })
        .catch(err => {
            next(err)
        })

}

module.exports = {
    authorizationPayment,
    authorizationWishlist,
    authorizationTicket
}