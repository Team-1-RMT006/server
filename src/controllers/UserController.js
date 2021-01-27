const { Customer, Event, Ticket, Wishlist, Status } = require("../models")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../userHelpers/generateAndVerifyToken")
const QRCode = require("qrcode")
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
                res.status(200).json(data) // masih belum di filter, belum tau dapetnya
            })
            .catch(err => {
                // console.log((err));
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
            res.status(201).json(newData)
            
        } catch (err) {
            next(err)
          } 
    }

    static getAllTicketByCustomer(req, res, next) {
        const CustomerId = req.dataUser.id

        Ticket.findAll({
            where: {
                CustomerId
            }
        })
            .then(data => {
                if(data.length > 0) {
                    res.status(200).json(data)
                } else {
                    throw {
                        status: 404,
                        message: "Data not found"
                    }
                }
            })
            .catch(err => {
                next(err)
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
                // console.log(data, "ini data");
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                // console.log(err, "---------");
                next(err)
            })
    }

    static changeStatusTicketEvent(req, res, next) {
        const inputData = {
            status: "closed",
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
                res.status(200).json(data[1][0])
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
                if (data.length > 0) {
                    res.status(200).json(data)
                } else {
                    throw {
                        status: 404,
                        message: "Data not found"
                    }
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
            })
            .catch(err => {
                next(err)
            })
    }

    static getDataHistoryPayment(req, res, next) {
        const CustomerId = req.dataUser.id

        Ticket.findAll({
            where: {
                CustomerId,
                status: "paid"
            }
        })
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json(data)
                } else {
                    throw {
                        status: 404,
                        message: "Data not found"
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getTicketById(req, res, next) {
        const id = req.params.id

        Ticket.findByPk(id, {
            include: [{
                model: Event,
                include: [Organizer, EventType, Status]
            }]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getEventById(req, res, next) {
        const id = req.params.id
    
        Event.findByPk(id, {
            include: [Ticket, Organizer, EventType, Status]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
      }
    
}

module.exports = ControllerUser