const { Customer, Event } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class ControllerUser {

    static registerCustomer(req, res) {
        const inputData  = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        Customer.create(inputData)
            .then(data => {
                res.status(201).json({ first_name: data.first_name, last_name: data.last_name, email: data.email })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static loginRegister(req, res) {
        const email = req.body.email
        const password = req.body.password

        Customer.findOne({
            where: {
                email
            }
        })
            .then(data => {
                // console.log(data);
                if(!data) {
                    res.status(400).json({ message: "Invali email/password"})
                }else {
                    let passwordInDataBase = data.password
                    if(bcrypt.compareSync(password, passwordInDataBase)) {
                        const accesToken = jwt.sign({ fullName: data.fullName(), email: data.email })
                        res.status(200).json(accesToken)
                    }else {
                        res.status(500).json(err)
                    }
                }
            })
            .catch(err => {
                res.status(err)
            })
    }

    static getAllDataEvents(req, res) {
        Event.findAll()
            .then(data => {
                res.status(200).json(data) // masih belum di filter, belum tau dapetnya
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static buyTicketEvent(req, res) {
        
    }

    static paymentTicket(req, res) {

    }

    static addWishlist(req, res) {

    }

    static deleteWishList(req, res) {

    }

    static getDataHistoryPayment(req, res) {

    }

}

module.exports = ControllerUser