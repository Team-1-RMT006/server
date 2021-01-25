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
    // console.log("ini di authhhhhhhhhhh");

    const id = req.params.id
    const CustomerId = req.dataUser.id
    console.log(id, "090909090909090");

    Wishlist.findByPk(id)
        .then(data => {
            console.log(data, "-----");
            // console.log(data);
            // console.log(Customer);
            if(CustomerId === data.CustomerId) {
                console.log("99999999999");
                next()
            }else {
                console.log("ooooooooo");
                res.status(401).json({ message: "You dont have permission"})
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