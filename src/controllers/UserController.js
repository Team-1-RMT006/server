const { Customer, Event, Ticket, Wishlist, Status } = require("../models")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../userHelpers/generateAndVerifyToken")
const QRCode = require("qrcode")
const Redis = require("ioredis")
const redis = new Redis()

class ControllerUser {

    static registerCustomer(req, res, next) {
        const inputData  = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        Customer.create(inputData)
            .then(data => {
                res.status(201).json({ id: data.id, first_name: data.first_name, last_name: data.last_name, email: data.email })           
            })
            .catch(err => {
                next(err)
            })
    }

    static loginRegister(req, res, next) {
        const email = req.body.email
        const password = req.body.password

        if(email === "" && password === "") {
            throw {
                status: 400,
                message: "Email and password are required"
            }
        }else if(email === "") {
            throw {
                status: 400,
                message: 'Email is required'
            }
        }else if(password === "") {
            throw {
                status: 400,
                message: 'Password is required'
            }
        }else {
            Customer.findOne({
                where: {
                    email
                }
            })
                .then(data => {    
                    if(!data) {
                        res.status(401).json({ message: "Invalid email/password"})
                    }else {
                        let passwordInDataBase = data.password
                        if(bcrypt.compareSync(password, passwordInDataBase)) {
                            const accesToken = generateToken({ id: data.id, email: data.email, name: data.fullName()})
                            res.status(200).json({access_token: accesToken})
                        }else {
                            res.status(401).json({"message": "Email or password is invalid"})
                        }
                    }
                })
                .catch(err => {
                    // console.log(err);
                    next(err)
                })

        }
    }

    static getAllDataEvents(req, res, next) { // ada double yang ngehandle
        // console.log(req.dataUser);
        Event.findAll({
            include: Status
        })
            .then(data => {
                // console.log("------");
                const dataEvents = JSON.parse(redis.get("events"))

                if(dataEvents) {
                    res.status(200).json(dataEvents)
                }else {
                    redis.set("events", JSON.stringify(data))
                    res.status(200).json(dataEvents) // masih belum di filter, belum tau dapetnya
                }
                
            })
            .catch(err => {
                console.log((err));
                next(err)
            })
    }

    static async buyTicketEvent(req, res, next) {
        const forTicket = JSON.stringify(req.dataUser)

        try {
            const data = await QRCode.toDataURL(forTicket)
            const newInputData = {
                    class: req.body.class,
                    CustomerId: req.dataUser.id,
                    EventId: req.body.EventId,
                    ticketCode: data, // GIMANA HAYOOOOO
                    seat: req.body.seat, 
                    status: "unpaid",
                    price: req.body.price
            }

            const newData = await Ticket.create(newInputData)
            // console.log("---------");
            const dataTickets = JSON.parse(redis.get("tickets"))

            if(dataTickets) {
                dataTickets.push(newData)
                redis.set("tickets", JSON.stringify(dataTickets))
            }

            res.status(201).json(dataTickets)
            // redis.delete()
            
        } catch (err) {
            // console.log(err);
            next(err)
          } 
    }

    static getAllTicketByCustomer(req, res) {
        const CustomerId = req.dataUser.id

        Ticket.findAll({
            where: {
                CustomerId
            }
        })
            .then(data => {
                const dataTickets = JSON.parse(redis.get("tickets"))
                if(dataTickets) {
                    res.status(200).json(dataTickets)
                }else {
                    redis.set("tickets", JSON.stringify(data))
                    res.status(200).json(dataTickets)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static paymentTicket(req, res, next) {

        // let idTicket = Number(req.body.idTicket)
        const inputData = {
            status: req.body.status,
            CustomerId: req.dataUser.id
        }
        const id = req.params.id // ini nanti di dapet dari fornt end
              
        // console.log(id, 'sampai');
        Ticket.update(inputData, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                const dataTickets = JSON.parse(redis.get("tickets"))
                
                if(dataTickets) {
                    dataTickets.push(data)
                    redis.set("tickets", JSON.stringify(dataTickets))
                }
                // console.log(data, "ini data");
                res.status(200).json(dataTickets[1][0])
            })
            .catch(err => {
                // console.log(err, "---------");
                next(err)
            })
    }

    static changeStatusTicketEvent(req, res, next) {
        const inputData = {
            status: "close",
            CustomerId: req.dataUser.id
        }
        const id = req.params.id

        Ticket.update(inputData, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                const dataTickets = JSON.parse(redis.get("tickets"))

                if(dataTickets) {
                    dataTickets.push(data)
                }

                res.status(200).json(dataTickets[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllDataWishlist(req, res, next) {
        const CustomerId = req.dataUser.id

        Wishlist.findAll({
            where: {
                CustomerId
            }
        })
            .then(data => {
                const dataWishlists = JSON.parse(redis.get("wishlists"))

                if(dataWishlists) {
                    res.status(200).json(dataWishlists)
                }else {
                    redis.set("wishlists", JSON.stringify(data))
                    res.status(200).json(dataWishlists)
                }
            })
            .catch(err => {
                // console.log(err);
                // res.status(500).json(err)
                next(err)
            })
    }

    static addWishlist(req, res, next) {
        const inputData = {
            CustomerId: req.dataUser.id,
            EventId: Number(req.body.EventId) || null
        }
        // console.log(inputData);

        Wishlist.create(inputData)
            .then(data => {
                // console.log("-----");
                const dataWishlists = JSON.parse(redis.get("tickets"))

                if(dataWishlists) {
                    dataWishlists.push(data)
                    redis.set("wishlists", JSON.stringify(dataWishlists))
                }
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
                // console.log(err);
                // res.status(500).json(err)
            })
    }

    static deleteWishList(req, res, next) {
        // console.log("test");
        const id = req.params.id
        // // const CustomerId = req.dataUser
        Wishlist.destroy({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: "Wishlist deleted successfully"})
                redis.del("wishlists")
            })
            .catch(err => {
                next(err)
            })
    }

    static getDataHistoryPayment(req, res) {
        const CustomerId = req.dataUser.id

        Ticket.findAll({
            where: {
                CustomerId,
                status: "paid"
            }
        })
            .then(data => {
                const history = JSON.parse(redis.get("history"))

                if(history) {
                    res.status(200).json(history)
                }else {
                    redis.set("history", JSON.stringify(data))
                    res.status(200).json(history)
                }
                // res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = ControllerUser