const { Customer, Event, Ticket, Wishlist } = require("../models")
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
                        const accesToken = generateToken({ id: data.id, email: data.email, name: data.fullName()})
                        res.status(200).json({access_token: accesToken})
                    }else {
                        res.status(500).json(err)
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllDataEvents(req, res, next) { // ada double yang ngehandle
        // console.log(req.dataUser);
        Event.findAll({
            where: {
                status: "active" 
            }
        })
            .then(data => {
                res.status(200).json(data) // masih belum di filter, belum tau dapetnya
            })
            .catch(err => {
                next(err)
            })
    }

    static async buyTicketEvent(req, res, next) {
        // console.log(JSON.stringify(req.dataUser));
        // console.log(req.tokenForTicket, "-0-0-0-0-");
        const forTicket = JSON.stringify(req.dataUser)

        try {
            const data = await QRCode.toDataURL(forTicket)
            // console.log(data);
            const newInputData = {
                    class: req.body.class,
                    CustomerId: req.dataUser.id,
                    EventTypeId: req.body.EventId,
                    ticketCode: data, // GIMANA HAYOOOOO
                    seat: req.body.seat, 
                    status: "Unpaid",
                    price: req.body.price,
                    event_preview: req.body.event_preview
                    // event_preview: req.body.event_preview
            }

            
            // console.log(newInputData);
            
            const newData = await Ticket.create(newInputData)
            
            res.status(201).json(newData)
            
        } catch (err) {
            // console.log(req.body);
            console.error(err, "---------")
          }

        // QRCode.toDataURL(forTicket, function(err, url) {
        //         // console.log(typeof(url));
        //     // migrateToQRCode = url
        //         // console.log(migrateToQRCode);
        //     // console.log(inputData);
        //     inputData = newInputData
        // })
        // console.log(inputData, "---");
        // Ticket.create(inputData)
        //     .then(data => {
        //         console.log("masuk ga sih?======");
        //             req.status(201).josn(data)
        //         })
        //         .catch(err => {
        //                 next(err)
        //             })
                    
        // let migrateToQRCode = null
        // QRCode.toDataURL(forTicket)
        //     .then(url => {
        //         migrateToQRCode = url
        //         console.log(url);
        //         console.log("ini pertama");
                
        //     })
        //     .catch(err => {
        //         console.log("ini eror");
        //     })
        //     const inputData = {
        //         class: req.body.class,
        //         CustomerId: req.dataUser.id,
        //         EventId: req.body.EventId,
        //         ticketCode: url, // GIMANA HAYOOOOO
        //         seat: req.body.seat, 
        //         status: "Unpaid",
        //         price: req.body.price
        //     }
            
    }

    static getAllTicketByCustomer(req, res) {
        const CustomerId = req.dataUser.id

        Ticket.findAll({
            where: {
                CustomerId
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static paymentTicket(req, res, next) {
        // console.log('sampai');
        const inputData = {
            status: req.body.status
        }
        const id = req.params.id // ini nanti di dapet dari fornt end
        Ticket.update(inputData, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                console.log(data, "ini data");
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllDataWishlist(req, res, next) {
        const CustomerId = req.dataUser.id
        // console.log(CustomerId);
        let dataWishlist = null

        Wishlist.findAll({
            where: {
                CustomerId
            }
        })
            .then(data => {
                dataWishlist = data
                // res.status(200).json(data)
                return Ticket.findAll({
                    where: {
                        CustomerId
                    }
                })
            })
            .then(data => {
                // console.log(dataWishlist, "----");
                // console.log(data, "0000");
                res.status(200).json(dataWishlist)
            })
            .catch(err => {
                // console.log(err);
                res.status(500).json(err)
            })
    }

    static addWishlist(req, res, next) {
        const inputData = {
            CustomerId: req.dataUser.id,
            EventId: Number(req.body.EventId) || null
        }
        console.log(inputData);

        Wishlist.create(inputData)
            .then(data => {
                console.log("-----");
                res.status(201).json(data)
            })
            .catch(err => {
                // next(err)
                console.log(err);
                // res.status(500).json(err)
            })
    }

    static deleteWishList(req, res, next) {
        // console.log("test");
        const id = req.params.id
        // // const CustomerId = req.dataUser
        // console.log(id);

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

    static getDataHistoryPayment(req, res) {
        const CustomerId = req.dataUser.id

        Ticket.findAll({
            where: {
                CustomerId,
                status: "Paid"
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = ControllerUser