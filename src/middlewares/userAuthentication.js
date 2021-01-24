const { verifyToken } = require("../userHelpers/generateAndVerifyToken")
const { Customer } = require("../models")

function authentication(req, res, next) {

    try{
        let access_token = req.headers.access_token
        // console.log(access_token, "-----")

        if(!access_token) {
            res.status(401).json({ error: "You must have account"})
        }else {
            const decoded = verifyToken(access_token)
            // console.log(decoded);
            // {
            //     id: 10,
            //     email: 'febri@mail.com',
            //     name: 'febri febri',
            //     iat: 1611435000
            // }
            
            let id = decoded.id
            let email = decoded.email
            req.dataUser = decoded
            req.tokenForTicket = access_token

            Customer.findOne({
                where: {
                    id,
                    email
                }
            })
                .then(data => {
                    if(data) {
                        next()
                    }else {
                        res.status(401).json({ error: "You must have account, please login first"})
                    }
                })
                .catch(err => {
                    next(err)
                })
        }

    }catch(err) {
        console.log(err)
        next(err)
    }
}

module.exports = authentication