const express = require('express')
const route = express.Router()
const ControllerUser = require('../controllers/UserController')
const authentication = require("../middlewares/userAuthentication")
const { authorizationPayment, authorizationWishlist } = require("../middlewares/userAuthorization")

route.post("/register", ControllerUser.registerCustomer)
route.post("/login", ControllerUser.loginRegister)
route.get("/eventactive", ControllerUser.getAllDataEvents)

route.use(authentication)
route.post("/book", ControllerUser.buyTicketEvent)
route.get("/wishlist", ControllerUser.getAllDataWishlist)
route.post("/wishlist", ControllerUser.addWishlist)
route.get("/history", ControllerUser.getDataHistoryPayment)
route.patch("/buy/:id", authorizationPayment, ControllerUser.paymentTicket)
route.delete("/wishlist/:id", authorizationWishlist, ControllerUser.deleteWishList)


module.exports = route