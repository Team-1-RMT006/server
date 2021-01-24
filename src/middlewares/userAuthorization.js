const { Wishlist, Ticket } = require("../models")

function authorizationPayment(req, res, next) {

    const id = req.params.id
    const CustomerId = req.dataUser

    Ticket.findByPk({
        where: {
            id
        }
    })
        .then(data => {
            if(CustomerId === data.CustomerId) {
                next()
            }else {
                res.status(500).json({ message: "You dont have permission"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

}

function authorizationWishlist(req, res, next) {

    const id = req.params.id
    const CustomerId = req.dataUser

    Wishlist.findByPk({
        where: {
            id
        }
    })
        .then(data => {
            if(CustomerId === data.CustomerId) {
                next()
            }else {
                res.status(500).json({ message: "You dont have permission"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
        
}

module.exports = {
    authorizationPayment,
    authorizationWishlist
}