const { Customer, Event, Ticket, Wishlist, Status, Organizer, EventType } = require("../models")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../userHelpers/generateAndVerifyToken")
const QRCode = require("qrcode")
const { sendEmail } = require("../helpers/sendEmail")
class ControllerUser {

    static registerCustomer(req, res, next) {
        const inputData = {
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

        if (email === "" && password === "") {
            throw {
                status: 400,
                message: "Email and password are required"
            }
        } else if (email === "") {
            throw {
                status: 400,
                message: 'Email is required'
            }
        } else if (password === "") {
            throw {
                status: 400,
                message: 'Password is required'
            }
        } else {
            Customer.findOne({
                where: {
                    email
                }
            })
                .then(data => {
                    if (!data) {
                        res.status(401).json({ message: "Invalid email/password" })
                    } else {
                        let passwordInDataBase = data.password
                        if (bcrypt.compareSync(password, passwordInDataBase)) {
                            const accesToken = generateToken({ id: data.id, email: data.email, name: data.fullName() })
                            res.status(200).json({ access_token: accesToken })
                        } else {
                            res.status(401).json({ "message": "Email or password is invalid" })
                        }
                    }
                })
                .catch(err => {
                    next(err)
                })

        }
    }

    static getAllDataEvents(req, res, next) { // ada double yang ngehandle
        Event.findAll({
            include: Status
        })
            .then(data => {
                res.status(200).json(data) // masih belum di filter, belum tau dapetnya
            })
            .catch(err => {
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

    static async paymentTicket(req, res, next) {
        // let idTicket = Number(req.body.idTicket)
        const inputData = {
            // status: req.body.status,
            // CustomerId: req.dataUser.id
            status: "paid"
        }
        const id = req.params.id // ini nanti di dapet dari fornt end

        const emailUser = req.dataUser.email
        try {
            const data = await Ticket.update(inputData, { where: { id }, returning: true })
            const temp = await Ticket.findByPk(id, { include: [Event, Customer] })
            const description = `Your ${data[1][0].class} ticket with price ${data[1][0].price} is ${data[1][0].status}`
            const qrCode = data[1][0].ticketCode
            const objTicket = {
                title: temp.Event.title,
                event_preview: temp.Event.event_preview,
                date: temp.Event.date,
                time: temp.Event.time,
                location: temp.Event.location,
                class: temp.class,
                price: temp.price,
                first_name: temp.Customer.first_name
            }
            await sendEmail(emailUser, description, qrCode, objTicket)
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
        // Ticket.update(inputData, {
        //     where: {
        //         id
        //     },
        //     returning: true
        // })
        //     .then(data => {
        //         const description = `Your ${data[1][0].class} ticket with price ${data[1][0].price} is ${data[1][0].status}`
        //         const qrCode = data[1][0].ticketCode
        //         await sendEmail(emailUser, description, qrCode)
        //         res.status(200).json(data[1][0])

        //     })
        //     .catch(err => {
        //         next(err)
        //     })
    }

    static changeStatusTicketEvent(req, res, next) {
        const inputData = {
            status: "closed",
        }
        const CustomerId = req.body.CustomerId
        const EventId = req.body.EventId

        Ticket.update(inputData, {
            where: {
                CustomerId,
                EventId
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
                next(err)
            })
    }

    static addWishlist(req, res, next) {
        const inputData = {
            CustomerId: req.dataUser.id,
            EventId: Number(req.body.EventId) || null
        }

        Wishlist.create(inputData)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
                // res.status(500).json(err)
            })
    }

    static deleteWishList(req, res, next) {
        const id = req.params.id
        // // const CustomerId = req.dataUser
        Wishlist.destroy({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({ message: "Wishlist deleted successfully" })
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