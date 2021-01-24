const { Wishlist, Ticket } = require("../models")

function authorizationPayment(req, res, next) {

    const id = req.params.id
    const CustomerId = req.dataUser.id
    // console.log(id);

    Ticket.findByPk(id)
        .then(data => {
            console.log(data);
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

    // console.log("test auth");

    const id = req.params.id
    const CustomerId = req.dataUser.id

    Wishlist.findByPk(id)
        .then(data => {
            // console.log(data);
            // console.log(Customer);
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