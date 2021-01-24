const express = require('express')
const route = express.Router()
const ControllerUser = require('../controllers/UserController')
const authentication = require("../middlewares/userAuthentication")
const { authorizationPayment, authorizationWishlist } = require("../middlewares/userAuthorization")

route.post("/register", ControllerUser.registerCustomer)
route.post("/login", ControllerUser.loginRegister)
route.get("/eventactive", ControllerUser.getAllDataEvents)

route.use(authentication)
route.post("/buy", ControllerUser.buyTicketEvent)
route.post("/wishlist", ControllerUser.addWishlist)
route.patch("/buy/:id", authorizationPayment, ControllerUser.paymentTicket)
route.delete("/wishlist/:id", authorizationWishlist, ControllerUser.deleteWishList)


module.exports = route