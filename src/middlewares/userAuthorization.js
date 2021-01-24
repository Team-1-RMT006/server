const { Wishlist } = require("../models")

function authorizationPayment(req, res, next) {

    const id = req.params.id
    const CustomerId = req.dataUser

    console.log(id, CustomerId, "ini payment");

    // Wishlist.findByPk({
    //     id
    // })
    //     .then(data => {
    //         // if(data. === )
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
}

function authorizationWishlist(req, res, next) {

    const id = req.params.id
    const CustomerId = req.dataUser

    console.log(id, CustomerId, "ini Wishlist");
}

module.exports = {
    authorizationPayment,
    authorizationWishlist
}